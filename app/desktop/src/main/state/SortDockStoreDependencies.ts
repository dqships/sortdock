import type { AppearanceMode } from "../../shared/models/AppearanceMode";
import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";
import type { PendingMovePrompt } from "../../shared/models/PendingMovePrompt";
import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";

/** Everything the store needs from the operating system, injected so the store can be tested. */
export type SortDockStoreDependencies = {
  platform: DesktopPlatform;
  defaultWatchedFolderPath: string;
  persistence: {
    load(): SortDockConfiguration;
    save(configuration: SortDockConfiguration): void;
  };
  pickFolder(options: { title: string; buttonLabel: string }): Promise<string | null>;
  setRunAtLogin(isEnabled: boolean): void;
  applyAppearance(mode: AppearanceMode): void;
  revealFile(path: string): void;
  openExternal(url: string): void;
  onPromptQueued?(prompt: PendingMovePrompt, waitingCount: number): void;
  createId?(): string;
  now?(): number;
};
