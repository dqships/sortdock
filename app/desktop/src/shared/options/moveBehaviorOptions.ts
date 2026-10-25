import type { MoveBehavior } from "../models/MoveBehavior";

export const moveBehaviorOptions: readonly { value: MoveBehavior; label: string; summary: string }[] = [
  { value: "askFirst", label: "Ask First", summary: "Ask first" },
  { value: "autoMove", label: "Auto Move", summary: "Auto move" },
];
