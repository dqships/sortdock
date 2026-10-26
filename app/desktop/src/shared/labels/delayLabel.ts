import type { SortDockSettings } from "../models/SortDockSettings";
import { delayOptions } from "../options/delayOptions";

export function delayLabel(settings: SortDockSettings): string {
  if (settings.delayOption === "custom") {
    return `${Math.round(settings.customDelaySeconds)} sec`;
  }

  return delayOptions.find((option) => option.value === settings.delayOption)?.label ?? "";
}
