import type { EditableSettings } from "../models/EditableSettings";
import type { MovePromptChoice } from "../models/MovePromptChoice";

/** Every change the window can ask for. The background process owns the real state. */
export type SortDockActions = {
  addDestination(name: string): void;
  chooseDestinationFolder(): Promise<string | null>;
  chooseWatchedFolder(): Promise<void>;
  useDownloadsFolder(): void;
  renameDestination(id: string, name: string): void;
  reconnectDestination(id: string): Promise<void>;
  removeDestination(id: string): void;
  saveRule(id: string | null, extensionText: string, destinationId: string): void;
  duplicateRule(id: string): void;
  deleteRule(id: string): void;
  saveKeywordRule(id: string | null, keywordText: string, destinationId: string, isEnabled: boolean): void;
  setKeywordRuleEnabled(id: string, isEnabled: boolean): void;
  moveKeywordRule(id: string, direction: "up" | "down"): void;
  deleteKeywordRule(id: string): void;
  updateSettings(patch: Partial<EditableSettings>): void;
  toggleSorting(): void;
  advanceOnboarding(): void;
  goBackInOnboarding(): void;
  completeOnboarding(): void;
  runSetupAgain(): void;
  resolveActivePrompt(choice: MovePromptChoice): Promise<void>;
  moveActivity(id: string): Promise<void>;
  leaveActivity(id: string): void;
  chooseFolderForActivity(id: string): Promise<void>;
  revealActivity(id: string): void;
  showHistory(): void;
  hideHistory(): void;
  clearHistory(): void;
  openUpdate(): void;
  openLegalPage(page: "privacy" | "terms"): void;
};
