import { app, nativeTheme, shell } from "electron";
import { join } from "node:path";

import { registerIpcHandlers } from "./ipc/registerIpcHandlers";
import { appIdentity } from "./services/appIdentity";
import { createApplicationMenu } from "./services/createApplicationMenu";
import { currentPlatform } from "./services/currentPlatform";
import { defaultDownloadsPath } from "./services/defaultDownloadsPath";
import { pickFolder } from "./services/pickFolder";
import { PromptNotifier } from "./services/PromptNotifier";
import { setRunAtLogin } from "./services/setRunAtLogin";
import { SettingsPersistence } from "./services/SettingsPersistence";
import { UpdateChecker } from "./services/UpdateChecker";
import { SortDockStore } from "./state/SortDockStore";
import { TrayController } from "./tray/TrayController";
import { MainWindowController } from "./windows/MainWindowController";

// Keeps settings in the same place whether SortDock runs installed or from source.
app.setName("SortDock");

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  launch();
}

function launch(): void {
  const platform = currentPlatform();
  let store: SortDockStore | null = null;
  let updateChecker: UpdateChecker | null = null;
  let isLaunched = false;
  let showWhenLaunched = false;
  const windowController = new MainWindowController(() => void updateChecker?.check());

  // The window needs the store and its request handlers, so wait until both exist.
  const showWindow = () => {
    if (isLaunched) {
      windowController.show();
    } else {
      showWhenLaunched = true;
    }
  };

  app.setAppUserModelId(appIdentity.appId);

  // Sorting keeps running from the menu bar or tray after the window closes.
  app.on("window-all-closed", () => undefined);
  app.on("second-instance", showWindow);
  // Mac: clicking the Dock icon. Ignored during startup so a sign-in launch stays quiet.
  app.on("activate", () => {
    if (isLaunched) {
      windowController.show();
    }
  });
  app.on("before-quit", () => store?.stop());

  void app.whenReady().then(async () => {
    createApplicationMenu();

    const downloadsPath = defaultDownloadsPath();
    const notifier = new PromptNotifier(
      () => windowController.isFocused(),
      () => windowController.show(),
    );
    const sortDockStore = new SortDockStore({
      platform,
      defaultWatchedFolderPath: downloadsPath,
      persistence: new SettingsPersistence(
        join(app.getPath("userData"), appIdentity.configurationFileName),
        downloadsPath,
      ),
      pickFolder: (options) => pickFolder(windowController.current, options),
      setRunAtLogin,
      applyAppearance: (mode) => {
        nativeTheme.themeSource = mode;
      },
      revealFile: (path) => shell.showItemInFolder(path),
      openExternal: (url) => void shell.openExternal(url),
      onPromptQueued: (prompt, waitingCount) => notifier.notify(prompt, waitingCount),
    });
    store = sortDockStore;

    const tray = new TrayController({
      openApp: () => windowController.show(),
      openHistory: () => {
        sortDockStore.showHistory();
        windowController.show();
      },
      toggleSorting: () => sortDockStore.toggleSorting(),
      runSetupAgain: () => {
        sortDockStore.runSetupAgain();
        windowController.show();
      },
      resolvePrompt: (choice) => void sortDockStore.resolveActivePrompt(choice),
      openUpdate: () => sortDockStore.openUpdate(),
      quit: () => app.quit(),
    });

    registerIpcHandlers(sortDockStore, windowController);
    sortDockStore.subscribe(() => {
      const snapshot = sortDockStore.snapshot();
      windowController.sendSnapshot(snapshot);
      tray.update(snapshot);
    });

    await sortDockStore.start();
    tray.start(sortDockStore.snapshot());

    updateChecker = new UpdateChecker(app.getVersion(), platform, (update) => sortDockStore.setAvailableUpdate(update));
    void updateChecker.check();

    // After setup, Mac starts quietly in the menu bar like the App Store version.
    // Windows opens the window unless it was started at sign-in.
    const launchedHidden = process.argv.includes(appIdentity.hiddenLaunchArgument) || platform === "mac";
    isLaunched = true;

    if (sortDockStore.needsOnboarding || !launchedHidden || showWhenLaunched) {
      windowController.show();
    } else if (platform === "mac") {
      app.dock?.hide();
    }
  });
}
