import type { SortDockSettings } from "./SortDockSettings";

export type EditableSettings = Pick<
  SortDockSettings,
  | "moveBehavior"
  | "delayOption"
  | "customDelaySeconds"
  | "askLaterEnabled"
  | "snoozeOption"
  | "customSnoozeMinutes"
  | "appearanceMode"
  | "runAtLogin"
  | "defaultDestinationId"
>;
