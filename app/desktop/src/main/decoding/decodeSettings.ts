import type { SortDockSettings } from "../../shared/models/SortDockSettings";
import { settingLimits } from "../../shared/options/settingLimits";
import { createDefaultSettings } from "./createDefaultSettings";
import { decodeSettingsPatch } from "./decodeSettingsPatch";
import { isRecord } from "./isRecord";
import { readNumberInRange } from "./readNumberInRange";

export function decodeSettings(value: unknown, defaultWatchedFolderPath: string): SortDockSettings {
  const defaults = createDefaultSettings(defaultWatchedFolderPath);

  if (!isRecord(value)) {
    return defaults;
  }

  return {
    ...defaults,
    ...decodeSettingsPatch(value),
    watchedFolderPath:
      typeof value.watchedFolderPath === "string" && value.watchedFolderPath.length > 0
        ? value.watchedFolderPath
        : defaults.watchedFolderPath,
    hasChosenWatchedFolder: value.hasChosenWatchedFolder === true,
    isSortingEnabled: typeof value.isSortingEnabled === "boolean" ? value.isSortingEnabled : defaults.isSortingEnabled,
    onboardingVersion: readNumberInRange(value.onboardingVersion, { min: 0, max: 1_000 }, 0),
    onboardingStep: readNumberInRange(value.onboardingStep, settingLimits.onboardingStep, 1),
  };
}
