import type { SortDockSettings } from "../models/SortDockSettings";
import { snoozeOptions } from "./snoozeOptions";

export function snoozeDelaySeconds(settings: SortDockSettings): number {
  const option = snoozeOptions.find((candidate) => candidate.value === settings.snoozeOption);
  return (option?.minutes ?? Math.max(1, settings.customSnoozeMinutes)) * 60;
}
