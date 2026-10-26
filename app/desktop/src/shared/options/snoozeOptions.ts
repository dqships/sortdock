import type { SnoozeOption } from "../models/SnoozeOption";

export const snoozeOptions: readonly { value: SnoozeOption; label: string; minutes: number | null }[] = [
  { value: "fiveMinutes", label: "5 min", minutes: 5 },
  { value: "tenMinutes", label: "10 min", minutes: 10 },
  { value: "thirtyMinutes", label: "30 min", minutes: 30 },
  { value: "oneHour", label: "1 hour", minutes: 60 },
  { value: "custom", label: "Custom", minutes: null },
];
