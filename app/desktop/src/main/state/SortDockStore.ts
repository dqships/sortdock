import { randomUUID } from "node:crypto";
import { basename } from "node:path";

import type { ActivityRecord } from "../../shared/models/ActivityRecord";
import type { ActivitySnapshot } from "../../shared/models/ActivitySnapshot";
import type { AppUpdate } from "../../shared/models/AppUpdate";
import type { DestinationFolder } from "../../shared/models/DestinationFolder";
import type { EditableSettings } from "../../shared/models/EditableSettings";
import type { MovePromptChoice } from "../../shared/models/MovePromptChoice";
import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";
import type { SortDockSettings } from "../../shared/models/SortDockSettings";
import type { SortDockSnapshot } from "../../shared/models/SortDockSnapshot";
import type { StatusTone } from "../../shared/models/StatusTone";
import type { SortDockActions } from "../../shared/ipc/SortDockActions";
import { delayLabel } from "../../shared/labels/delayLabel";
import { actionDelaySeconds } from "../../shared/options/actionDelaySeconds";
import { settingLimits } from "../../shared/options/settingLimits";
import { snoozeDelaySeconds } from "../../shared/options/snoozeDelaySeconds";
import { findDuplicateExtensions } from "../../shared/rules/findDuplicateExtensions";
import { normalizeFileTypeList } from "../../shared/rules/normalizeFileTypeList";
import { normalizeKeywordList } from "../../shared/rules/normalizeKeywordList";
import { resolveDestinationId } from "../../shared/rules/resolveDestinationId";
import { maxActivityCount } from "../decoding/decodeConfiguration";
import { decodeSettingsPatch } from "../decoding/decodeSettingsPatch";
import { destinationAvailability } from "../services/destinationAvailability";
import { destinationFolderPath } from "../services/destinationFolderPath";
import { FolderWatcher } from "../services/FolderWatcher";
import { isDirectory } from "../services/isDirectory";
import { isFile } from "../services/isFile";
import { isSamePath } from "../services/isSamePath";
import { listTopLevelFiles } from "../services/listTopLevelFiles";
import { moveFileSafely } from "../services/moveFileSafely";
import { siteLinks } from "../services/siteLinks";
import { PendingMovePromptQueue } from "./PendingMovePromptQueue";
import type { SortDockStoreDependencies } from "./SortDockStoreDependencies";

type ActivityFields = Omit<ActivityRecord, "id" | "date" | "snoozedUntil"> & { snoozedUntil?: number | null };

/**
 * Owns SortDock's settings, folder watching, prompts, history, and the move flow.
 * It lives in the background process so sorting keeps running with the window closed.
 */
export class SortDockStore implements SortDockActions {
  private configuration: SortDockConfiguration;
  private statusMessage = "Ready";
  private isHistoryPresented = false;
  private availableUpdate: AppUpdate | null = null;
  private readonly promptQueue = new PendingMovePromptQueue();
  private knownFilePaths = new Set<string>();
  private watcher: FolderWatcher | null = null;
  private watcherGeneration = 0;
  private scanTimer: ReturnType<typeof setTimeout> | null = null;
  private fileWork: Promise<void> = Promise.resolve();
  private readonly snoozeTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly listeners = new Set<() => void>();
  private needsPersist = false;
  private isFlushScheduled = false;
  private readonly createId: () => string;
  private readonly now: () => number;

  constructor(private readonly dependencies: SortDockStoreDependencies) {
    this.configuration = dependencies.persistence.load();
    this.createId = dependencies.createId ?? randomUUID;
    this.now = dependencies.now ?? Date.now;
  }

  // MARK: Lifecycle

  get needsOnboarding(): boolean {
    return this.settings.onboardingVersion < 1;
  }

  async start(): Promise<void> {
    this.dependencies.applyAppearance(this.settings.appearanceMode);

    if (this.needsOnboarding) {
      this.setStatus("Finish setup to start sorting.");
      return;
    }

    this.updateLoginItem();
    await this.restartWatcher();
    this.resumeWaitingActivities();
  }

  stop(): void {
    this.watcher?.stop();
    this.watcher = null;
    this.clearScanTimer();
    this.snoozeTimers.forEach((timer) => clearTimeout(timer));
    this.snoozeTimers.clear();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Waits for queued scans and timed rechecks. Used by tests and before quitting. */
  async idle(): Promise<void> {
    await this.fileWork;
  }

  setAvailableUpdate(update: AppUpdate | null): void {
    this.availableUpdate = update;
    this.changed(false);
  }

  snapshot(): SortDockSnapshot {
    const { settings } = this;
    const status = this.currentStatus();

    return {
      platform: this.dependencies.platform,
      settings: { ...settings },
      destinations: this.configuration.destinations.map((destination) => ({
        ...destination,
        availability: destinationAvailability(destination),
      })),
      rules: this.configuration.rules.map((rule) => ({ ...rule, extensions: [...rule.extensions] })),
      keywordRules: this.configuration.keywordRules.map((rule) => ({ ...rule, keywords: [...rule.keywords] })),
      activities: this.configuration.activities.map((activity) => this.activitySnapshot(activity)),
      prompts: [...this.promptQueue.all],
      statusMessage: this.statusMessage,
      statusTitle: status.title,
      statusTone: status.tone,
      watchedFolderName: this.watchedFolderName,
      isHistoryPresented: this.isHistoryPresented,
      availableUpdate: this.availableUpdate,
    };
  }

  // MARK: Watched folder

  async chooseWatchedFolder(): Promise<void> {
    const folderPath = await this.dependencies.pickFolder({
      title: "Choose the folder SortDock should watch.",
      buttonLabel: "Watch This Folder",
    });

    if (folderPath) {
      this.setWatchedFolder(folderPath);
    }
  }

  useDownloadsFolder(): void {
    this.setWatchedFolder(this.dependencies.defaultWatchedFolderPath);
  }

  // MARK: Destinations

  addDestination(rawName: string): void {
    const name = cleanName(rawName);

    if (!name) {
      return;
    }

    this.configuration.destinations.push({ id: this.createId(), name, folderPath: null });
    this.changed();
  }

  async chooseDestinationFolder(): Promise<string | null> {
    const folderPath = await this.pickFolderOutsideWatchedFolder("Choose a folder for sorted files.", "Use This Folder");

    if (!folderPath) {
      return null;
    }

    const existing = this.configuration.destinations.find(
      (destination) => destination.folderPath !== null && isSamePath(destination.folderPath, folderPath),
    );

    if (existing) {
      this.setStatus(`${existing.name} is already a destination.`);
      return existing.id;
    }

    const destination: DestinationFolder = {
      id: this.createId(),
      name: basename(folderPath) || folderPath,
      folderPath,
    };
    this.configuration.destinations.push(destination);
    this.statusMessage = `Added ${destination.name}.`;
    this.changed();
    return destination.id;
  }

  renameDestination(id: string, rawName: string): void {
    const destination = this.findDestination(id);
    const name = cleanName(rawName);

    if (!destination || !name) {
      return;
    }

    destination.name = name;
    this.changed();
  }

  async reconnectDestination(id: string): Promise<void> {
    const destination = this.findDestination(id);

    if (!destination) {
      return;
    }

    const folderPath = await this.pickFolderOutsideWatchedFolder(
      `Choose the folder used by ${destination.name}.`,
      "Use This Folder",
    );

    if (!folderPath) {
      return;
    }

    destination.folderPath = folderPath;
    this.statusMessage = `Reconnected ${destination.name}.`;
    this.changed();
  }

  removeDestination(id: string): void {
    const { configuration } = this;
    configuration.destinations = configuration.destinations.filter((destination) => destination.id !== id);
    configuration.rules = configuration.rules.filter((rule) => rule.destinationId !== id);
    configuration.keywordRules = configuration.keywordRules.filter((rule) => rule.destinationId !== id);

    if (configuration.settings.defaultDestinationId === id) {
      configuration.settings.defaultDestinationId = null;
    }

    this.changed();
  }

  // MARK: File type rules

  saveRule(id: string | null, extensionText: string, destinationId: string): void {
    const extensions = normalizeFileTypeList(extensionText);
    const rules = this.configuration.rules;

    if (
      extensions.length === 0 ||
      !this.findDestination(destinationId) ||
      findDuplicateExtensions(extensions, rules, id).length > 0
    ) {
      return;
    }

    const rule = id ? rules.find((candidate) => candidate.id === id) : undefined;

    if (rule) {
      rule.extensions = extensions;
      rule.destinationId = destinationId;
    } else {
      rules.push({ id: this.createId(), extensions, destinationId });
    }

    this.changed();
  }

  duplicateRule(id: string): void {
    const rule = this.configuration.rules.find((candidate) => candidate.id === id);

    if (rule) {
      this.configuration.rules.push({ ...rule, id: this.createId(), extensions: [...rule.extensions] });
      this.changed();
    }
  }

  deleteRule(id: string): void {
    this.configuration.rules = this.configuration.rules.filter((rule) => rule.id !== id);
    this.changed();
  }

  // MARK: Keyword rules

  saveKeywordRule(id: string | null, keywordText: string, destinationId: string, isEnabled: boolean): void {
    const keywords = normalizeKeywordList(keywordText);

    if (keywords.length === 0 || !this.findDestination(destinationId)) {
      return;
    }

    const rules = this.configuration.keywordRules;
    const rule = id ? rules.find((candidate) => candidate.id === id) : undefined;

    if (rule) {
      rule.keywords = keywords;
      rule.destinationId = destinationId;
      rule.isEnabled = isEnabled === true;
    } else {
      rules.push({ id: this.createId(), keywords, destinationId, isEnabled: isEnabled === true });
    }

    this.changed();
  }

  setKeywordRuleEnabled(id: string, isEnabled: boolean): void {
    const rule = this.configuration.keywordRules.find((candidate) => candidate.id === id);

    if (rule) {
      rule.isEnabled = isEnabled === true;
      this.changed();
    }
  }

  moveKeywordRule(id: string, direction: "up" | "down"): void {
    const rules = this.configuration.keywordRules;
    const index = rules.findIndex((rule) => rule.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= rules.length) {
      return;
    }

    const [rule] = rules.splice(index, 1);
    rules.splice(targetIndex, 0, rule!);
    this.changed();
  }

  deleteKeywordRule(id: string): void {
    this.configuration.keywordRules = this.configuration.keywordRules.filter((rule) => rule.id !== id);
    this.changed();
  }

  // MARK: Settings

  updateSettings(patch: Partial<EditableSettings>): void {
    const changes = decodeSettingsPatch(patch);

    if (changes.defaultDestinationId && !this.findDestination(changes.defaultDestinationId)) {
      delete changes.defaultDestinationId;
    }

    const oldSettings = { ...this.settings };
    Object.assign(this.configuration.settings, changes);
    this.changed();
    this.handleSettingsChange(oldSettings);
  }

  toggleSorting(): void {
    const oldSettings = { ...this.settings };
    this.configuration.settings.isSortingEnabled = !oldSettings.isSortingEnabled;
    this.changed();
    this.handleSettingsChange(oldSettings);
  }

  // MARK: Setup

  advanceOnboarding(): void {
    this.setOnboardingStep(this.settings.onboardingStep + 1);
  }

  goBackInOnboarding(): void {
    this.setOnboardingStep(this.settings.onboardingStep - 1);
  }

  async completeOnboarding(): Promise<void> {
    if (!this.settings.hasChosenWatchedFolder) {
      this.statusMessage = "Choose a folder before starting.";
      this.setOnboardingStep(2);
      return;
    }

    this.configuration.settings.onboardingVersion = 1;
    this.configuration.settings.onboardingStep = settingLimits.onboardingStep.max;
    this.changed();
    await this.start();
  }

  runSetupAgain(): void {
    this.configuration.settings.onboardingVersion = 0;
    this.setOnboardingStep(1);
  }

  // MARK: Prompts

  async resolveActivePrompt(choice: MovePromptChoice): Promise<void> {
    const prompt = this.promptQueue.resolveCurrent();

    if (!prompt) {
      return;
    }

    this.changed(false);

    if (!isFile(prompt.sourcePath)) {
      this.recordMissing(prompt.sourcePath, prompt.activityId);
      return;
    }

    const destination = this.findDestination(prompt.destinationId);

    if (!destination) {
      this.recordFailed(prompt.sourcePath, null, prompt.activityId);
      this.setStatus(`Choose a new destination for ${prompt.fileName}.`);
      return;
    }

    switch (choice) {
      case "move":
        await this.performMove(prompt.sourcePath, destination, null, prompt.activityId);
        return;
      case "leave":
        this.recordLeft(prompt.sourcePath, destination, prompt.activityId);
        return;
      case "askLater":
        this.scheduleAskLater(prompt.sourcePath, destination, prompt.activityId);
        return;
      case "chooseFolder": {
        const folderPath = await this.pickFolderOutsideWatchedFolder("Choose where this file should go.", "Choose");

        if (folderPath) {
          await this.performMove(prompt.sourcePath, destination, folderPath, prompt.activityId);
        } else {
          this.scheduleAskLater(prompt.sourcePath, destination, prompt.activityId);
        }
      }
    }
  }

  // MARK: History

  showHistory(): void {
    this.isHistoryPresented = true;
    this.changed(false);
  }

  hideHistory(): void {
    this.isHistoryPresented = false;
    this.changed(false);
  }

  clearHistory(): void {
    this.snoozeTimers.forEach((timer) => clearTimeout(timer));
    this.snoozeTimers.clear();
    this.promptQueue.discardAll();
    this.configuration.activities = [];
    this.statusMessage = "History cleared.";
    this.changed();
  }

  async moveActivity(id: string): Promise<void> {
    const activity = this.findActivity(id);
    const filePath = activity ? this.existingFilePath(activity) : null;

    if (!activity || !filePath) {
      this.setStatus(`Could not find ${activity?.fileName ?? "that file"}.`);
      return;
    }

    const destination = this.suggestedDestination(activity);

    if (!destination) {
      this.setStatus(`Choose where ${basename(filePath)} should go.`);
      return;
    }

    this.releaseActivity(id);
    await this.performMove(filePath, destination, null, id);
  }

  leaveActivity(id: string): void {
    const activity = this.findActivity(id);
    const filePath = activity ? this.existingFilePath(activity) : null;

    if (!activity || !filePath) {
      this.setStatus(`Could not find ${activity?.fileName ?? "that file"}.`);
      return;
    }

    this.releaseActivity(id);
    this.recordLeft(filePath, this.suggestedDestination(activity), id);
    this.setStatus(`Left ${basename(filePath)}.`);
  }

  async chooseFolderForActivity(id: string): Promise<void> {
    const activity = this.findActivity(id);
    const filePath = activity ? this.existingFilePath(activity) : null;

    if (!activity || !filePath) {
      this.setStatus(`Could not find ${activity?.fileName ?? "that file"}.`);
      return;
    }

    const folderPath = await this.pickFolderOutsideWatchedFolder("Choose where this file should go.", "Choose");

    if (!folderPath) {
      return;
    }

    this.releaseActivity(id);
    const destination: DestinationFolder = { id: this.createId(), name: basename(folderPath), folderPath };
    await this.performMove(filePath, destination, folderPath, id);
  }

  revealActivity(id: string): void {
    const activity = this.findActivity(id);
    const filePath = activity ? this.existingFilePath(activity) : null;

    if (filePath) {
      this.dependencies.revealFile(filePath);
    } else {
      this.setStatus(`Could not find ${activity?.fileName ?? "that file"}.`);
    }
  }

  // MARK: Links

  openUpdate(): void {
    if (this.availableUpdate) {
      this.dependencies.openExternal(this.availableUpdate.downloadUrl);
    }
  }

  openLegalPage(page: "privacy" | "terms"): void {
    this.dependencies.openExternal(page === "terms" ? siteLinks.terms : siteLinks.privacy);
  }

  // MARK: Private state helpers

  private get settings(): SortDockSettings {
    return this.configuration.settings;
  }

  private get watchedFolderName(): string {
    return basename(this.settings.watchedFolderPath) || this.settings.watchedFolderPath;
  }

  private currentStatus(): { title: string; tone: StatusTone } {
    if (!this.settings.isSortingEnabled) {
      return { title: "Paused", tone: "paused" };
    }

    if (!this.settings.hasChosenWatchedFolder || !isDirectory(this.settings.watchedFolderPath)) {
      return { title: "Needs folder access", tone: "warning" };
    }

    if (this.needsOnboarding) {
      return { title: "Finish setup", tone: "warning" };
    }

    return { title: "Sorting active", tone: "active" };
  }

  private changed(persist = true): void {
    this.needsPersist ||= persist;

    if (this.isFlushScheduled) {
      return;
    }

    this.isFlushScheduled = true;
    queueMicrotask(() => {
      this.isFlushScheduled = false;

      if (this.needsPersist) {
        this.needsPersist = false;
        this.dependencies.persistence.save(this.configuration);
      }

      this.listeners.forEach((listener) => listener());
    });
  }

  private setStatus(message: string): void {
    if (message !== this.statusMessage) {
      this.statusMessage = message;
      this.changed(false);
    }
  }

  private setOnboardingStep(step: number): void {
    const { min, max } = settingLimits.onboardingStep;
    this.configuration.settings.onboardingStep = Math.min(Math.max(step, min), max);
    this.changed();
  }

  private setWatchedFolder(folderPath: string): void {
    const oldSettings = { ...this.settings };
    this.configuration.settings.watchedFolderPath = folderPath;
    this.configuration.settings.hasChosenWatchedFolder = true;
    this.changed();
    this.handleSettingsChange(oldSettings);
  }

  private handleSettingsChange(oldSettings: SortDockSettings): void {
    const { settings } = this;

    if (settings.appearanceMode !== oldSettings.appearanceMode) {
      this.dependencies.applyAppearance(settings.appearanceMode);
    }

    if (settings.runAtLogin !== oldSettings.runAtLogin && !this.needsOnboarding) {
      this.updateLoginItem();
    }

    if (
      !this.needsOnboarding &&
      (settings.watchedFolderPath !== oldSettings.watchedFolderPath ||
        settings.isSortingEnabled !== oldSettings.isSortingEnabled)
    ) {
      void this.restartWatcher();
    }
  }

  private updateLoginItem(): void {
    try {
      this.dependencies.setRunAtLogin(this.settings.runAtLogin);
    } catch {
      this.setStatus("Run at login could not be changed.");
    }
  }

  private findDestination(id: string | null): DestinationFolder | undefined {
    return this.configuration.destinations.find((destination) => destination.id === id);
  }

  private findActivity(id: string): ActivityRecord | undefined {
    return this.configuration.activities.find((activity) => activity.id === id);
  }

  private destinationForFile(filePath: string): DestinationFolder | undefined {
    const destinationId = resolveDestinationId(
      basename(filePath),
      this.configuration.keywordRules,
      this.configuration.rules,
      this.settings.defaultDestinationId,
    );

    return this.findDestination(destinationId);
  }

  private existingFilePath(activity: ActivityRecord): string | null {
    return [activity.currentPath, activity.sourcePath].find((path) => path !== null && isFile(path)) ?? null;
  }

  private suggestedDestination(activity: ActivityRecord): DestinationFolder | undefined {
    const known = this.findDestination(activity.destinationId);

    if (known) {
      return known;
    }

    const filePath = this.existingFilePath(activity);
    return filePath ? this.destinationForFile(filePath) : undefined;
  }

  private activitySnapshot(activity: ActivityRecord): ActivitySnapshot {
    const filePath = this.existingFilePath(activity);
    const destination = this.suggestedDestination(activity);
    const canMove =
      activity.status !== "moved" &&
      filePath !== null &&
      destination !== undefined &&
      destinationAvailability(destination) === "available";

    return {
      ...activity,
      canChooseFolder: activity.status !== "moved" && filePath !== null,
      canLeave: filePath !== null && (activity.status === "waiting" || activity.status === "failed"),
      canMove,
      canReveal: filePath !== null,
      suggestedDestinationName: destination?.name ?? activity.destinationName,
    };
  }

  private async pickFolderOutsideWatchedFolder(title: string, buttonLabel: string): Promise<string | null> {
    const folderPath = await this.dependencies.pickFolder({ title, buttonLabel });

    if (folderPath && isSamePath(folderPath, this.settings.watchedFolderPath)) {
      this.setStatus("Choose a folder outside the folder SortDock watches.");
      return null;
    }

    return folderPath;
  }

  // MARK: Watching

  private async restartWatcher(): Promise<void> {
    const generation = ++this.watcherGeneration;
    this.watcher?.stop();
    this.watcher = null;
    this.clearScanTimer();

    if (!this.settings.isSortingEnabled) {
      this.setStatus("Sorting is paused.");
      return;
    }

    const folderPath = this.settings.watchedFolderPath;

    if (!this.settings.hasChosenWatchedFolder || !isDirectory(folderPath)) {
      this.setStatus("Choose a folder to start sorting.");
      return;
    }

    const files = await listTopLevelFiles(folderPath);

    if (generation !== this.watcherGeneration) {
      return;
    }

    this.knownFilePaths = new Set(files);
    const watcher = new FolderWatcher(
      folderPath,
      () => this.scheduleScan(),
      () => this.setStatus("Choose a folder to start sorting."),
    );

    if (!watcher.start()) {
      this.setStatus("SortDock cannot open that folder. Choose it again.");
      return;
    }

    this.watcher = watcher;
    this.setStatus(`Watching ${this.watchedFolderName}.`);
  }

  private clearScanTimer(): void {
    if (this.scanTimer) {
      clearTimeout(this.scanTimer);
      this.scanTimer = null;
    }
  }

  private scheduleScan(): void {
    this.clearScanTimer();
    this.setStatus(`Waiting ${delayLabel(this.settings)} before sorting.`);
    this.scanTimer = setTimeout(() => {
      this.scanTimer = null;
      this.runFileWork(() => this.scanForNewFiles());
    }, actionDelaySeconds(this.settings) * 1_000);
  }

  /** Runs scans and timed rechecks one at a time so a file is never handled twice at once. */
  private runFileWork(work: () => Promise<void>): void {
    this.fileWork = this.fileWork.then(work).catch((error: unknown) => {
      console.error("SortDock file work failed", error);
    });
  }

  private async scanForNewFiles(): Promise<void> {
    if (!this.settings.isSortingEnabled || !this.watcher) {
      return;
    }

    const files = await listTopLevelFiles(this.settings.watchedFolderPath);
    const newFiles = files.filter((filePath) => !this.knownFilePaths.has(filePath));
    // Replace the set so a file that left and came back counts as new.
    this.knownFilePaths = new Set(files);

    if (newFiles.length === 0) {
      this.setStatus(`Watching ${this.watchedFolderName}.`);
      return;
    }

    for (const filePath of newFiles) {
      await this.processFile(filePath, null);
    }
  }

  private resumeWaitingActivities(): void {
    for (const activity of this.configuration.activities.filter((candidate) => candidate.status === "waiting")) {
      const filePath = this.existingFilePath(activity);

      if (!filePath) {
        const lastPath = activity.currentPath ?? activity.sourcePath;

        if (lastPath) {
          this.recordMissing(lastPath, activity.id);
        }

        continue;
      }

      if (activity.snoozedUntil !== null && activity.snoozedUntil > this.now()) {
        this.scheduleSnoozeTimer(activity.id, filePath, activity.snoozedUntil);
      } else {
        this.runFileWork(() => this.processFile(filePath, activity.id));
      }
    }
  }

  // MARK: Move flow

  private async processFile(filePath: string, activityId: string | null): Promise<void> {
    if (!isFile(filePath)) {
      if (activityId) {
        this.recordMissing(filePath, activityId);
      }

      return;
    }

    const destination = this.destinationForFile(filePath);

    if (!destination) {
      this.recordLeft(filePath, null, activityId);
      return;
    }

    if (destinationAvailability(destination) !== "available") {
      this.recordUnavailableDestination(filePath, destination, activityId);
      this.setStatus(`${destination.name} needs your attention.`);
      return;
    }

    if (this.settings.moveBehavior === "autoMove") {
      await this.performMove(filePath, destination, null, activityId);
      return;
    }

    const recordId = activityId ?? this.createId();
    const fileName = basename(filePath);
    this.upsertActivity(recordId, {
      message: `Waiting for a decision about ${fileName}.`,
      status: "waiting",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: destination.id,
      destinationName: destination.name,
    });

    const prompt = {
      id: this.createId(),
      sourcePath: filePath,
      fileName,
      watchedFolderName: this.watchedFolderName,
      destinationId: destination.id,
      destinationName: destination.name,
      activityId: recordId,
    };

    if (this.promptQueue.enqueue(prompt)) {
      this.dependencies.onPromptQueued?.(prompt, this.promptQueue.all.length);
    }

    this.statusMessage = "Waiting for your choice.";
    this.changed();
  }

  private async performMove(
    filePath: string,
    destination: DestinationFolder,
    customFolderPath: string | null,
    activityId: string | null,
  ): Promise<void> {
    const fileName = basename(filePath);

    if (customFolderPath === null && destinationAvailability(destination) !== "available") {
      this.recordUnavailableDestination(filePath, destination, activityId);
      this.setStatus(`${destination.name} needs your attention.`);
      return;
    }

    const folderPath = customFolderPath ?? destinationFolderPath(destination, this.settings.watchedFolderPath);

    try {
      const movedPath = await moveFileSafely(filePath, folderPath);
      const folderName = basename(folderPath) || folderPath;
      this.upsertActivity(activityId ?? this.createId(), {
        message: `Moved ${fileName} to ${folderName}.`,
        status: "moved",
        fileName,
        sourcePath: filePath,
        currentPath: movedPath,
        destinationId: this.findDestination(destination.id) ? destination.id : null,
        destinationName: folderName,
      });
      this.setStatus(`Moved ${fileName}.`);
    } catch {
      this.recordFailed(filePath, destination, activityId);
      this.setStatus(`Could not move ${fileName}.`);
    }
  }

  private scheduleAskLater(filePath: string, destination: DestinationFolder, activityId: string): void {
    const snoozedUntil = this.now() + snoozeDelaySeconds(this.settings) * 1_000;
    const fileName = basename(filePath);
    this.upsertActivity(activityId, {
      message: `Asked later for ${fileName}.`,
      status: "waiting",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: destination.id,
      destinationName: destination.name,
      snoozedUntil,
    });
    this.scheduleSnoozeTimer(activityId, filePath, snoozedUntil);
  }

  private scheduleSnoozeTimer(activityId: string, filePath: string, snoozedUntil: number): void {
    this.cancelSnooze(activityId);
    const delay = Math.max(0, snoozedUntil - this.now());
    this.snoozeTimers.set(
      activityId,
      setTimeout(() => {
        this.snoozeTimers.delete(activityId);
        this.runFileWork(() => this.processFile(filePath, activityId));
      }, delay),
    );
  }

  private cancelSnooze(activityId: string): void {
    const timer = this.snoozeTimers.get(activityId);

    if (timer) {
      clearTimeout(timer);
      this.snoozeTimers.delete(activityId);
    }
  }

  /** Stops any timer or waiting prompt for an activity the user just handled from History. */
  private releaseActivity(activityId: string): void {
    this.cancelSnooze(activityId);
    this.promptQueue.removeActivity(activityId);
  }

  // MARK: History records

  private recordFailed(filePath: string, destination: DestinationFolder | null, activityId: string | null): void {
    const fileName = basename(filePath);
    this.upsertActivity(activityId ?? this.createId(), {
      message: `Could not move ${fileName}.`,
      status: "failed",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: destination?.id ?? null,
      destinationName: destination?.name ?? null,
    });
  }

  private recordLeft(filePath: string, destination: DestinationFolder | undefined | null, activityId: string | null): void {
    const fileName = basename(filePath);
    this.upsertActivity(activityId ?? this.createId(), {
      message: `Left ${fileName} in ${this.watchedFolderName}.`,
      status: "left",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: destination?.id ?? null,
      destinationName: destination?.name ?? null,
    });
  }

  private recordMissing(filePath: string, activityId: string): void {
    const fileName = basename(filePath);
    this.upsertActivity(activityId, {
      message: `Could not find ${fileName}.`,
      status: "failed",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: null,
      destinationName: null,
    });
  }

  private recordUnavailableDestination(
    filePath: string,
    destination: DestinationFolder,
    activityId: string | null,
  ): void {
    const fileName = basename(filePath);
    this.upsertActivity(activityId ?? this.createId(), {
      message: `Left ${fileName} in place because ${destination.name} is unavailable.`,
      status: "failed",
      fileName,
      sourcePath: filePath,
      currentPath: filePath,
      destinationId: destination.id,
      destinationName: destination.name,
    });
  }

  private upsertActivity(id: string, fields: ActivityFields): void {
    const record: ActivityRecord = { ...fields, id, date: this.now(), snoozedUntil: fields.snoozedUntil ?? null };
    const others = this.configuration.activities.filter((activity) => activity.id !== id);
    this.configuration.activities = [record, ...others].slice(0, maxActivityCount);
    this.changed();
  }
}

function cleanName(rawName: string): string {
  return typeof rawName === "string" ? rawName.trim() : "";
}
