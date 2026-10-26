import type { SortDockSettings } from "../models/SortDockSettings";
import { delayOptions } from "./delayOptions";

export function actionDelaySeconds(settings: SortDockSettings): number {
  const option = delayOptions.find((candidate) => candidate.value === settings.delayOption);
  return option?.seconds ?? Math.max(1, settings.customDelaySeconds);
}
