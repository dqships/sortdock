import type { MoveBehavior } from "../models/MoveBehavior";
import { moveBehaviorOptions } from "../options/moveBehaviorOptions";

export function moveBehaviorSummary(behavior: MoveBehavior): string {
  return moveBehaviorOptions.find((option) => option.value === behavior)?.summary ?? "";
}
