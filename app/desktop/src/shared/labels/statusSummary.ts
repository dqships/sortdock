import type { SortDockSnapshot } from "../models/SortDockSnapshot";
import { delayLabel } from "./delayLabel";
import { moveBehaviorSummary } from "./moveBehaviorSummary";

export function statusSummary(snapshot: SortDockSnapshot): string {
  const ruleCount = snapshot.rules.length + snapshot.keywordRules.length;
  const behavior = moveBehaviorSummary(snapshot.settings.moveBehavior);
  return `${snapshot.watchedFolderName} → ${ruleCount} rules → ${behavior} after ${delayLabel(snapshot.settings)}`;
}
