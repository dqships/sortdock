import type { SortDockSettings } from "../../shared/models/SortDockSettings";

export function createDefaultSettings(watchedFolderPath: string): SortDockSettings {
  return {
    watchedFolderPath,
    hasChosenWatchedFolder: false,
    isSortingEnabled: true,
    moveBehavior: "askFirst",
    delayOption: "tenSeconds",
    customDelaySeconds: 10,
    askLaterEnabled: true,
    snoozeOption: "tenMinutes",
    customSnoozeMinutes: 10,
    appearanceMode: "system",
    runAtLogin: true,
    defaultDestinationId: null,
    onboardingVersion: 0,
    onboardingStep: 1,
  };
}
