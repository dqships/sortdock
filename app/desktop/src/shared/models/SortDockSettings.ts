import type { AppearanceMode } from "./AppearanceMode";
import type { DelayOption } from "./DelayOption";
import type { MoveBehavior } from "./MoveBehavior";
import type { SnoozeOption } from "./SnoozeOption";

export type SortDockSettings = {
  watchedFolderPath: string;
  /** True once the user has picked the folder to watch. */
  hasChosenWatchedFolder: boolean;
  isSortingEnabled: boolean;
  moveBehavior: MoveBehavior;
  delayOption: DelayOption;
  customDelaySeconds: number;
  askLaterEnabled: boolean;
  snoozeOption: SnoozeOption;
  customSnoozeMinutes: number;
  appearanceMode: AppearanceMode;
  runAtLogin: boolean;
  defaultDestinationId: string | null;
  onboardingVersion: number;
  onboardingStep: number;
};
