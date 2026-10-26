import type { DelayOption } from "../models/DelayOption";

export const delayOptions: readonly { value: DelayOption; label: string; seconds: number | null }[] = [
  { value: "threeSeconds", label: "3 sec", seconds: 3 },
  { value: "tenSeconds", label: "10 sec", seconds: 10 },
  { value: "thirtySeconds", label: "30 sec", seconds: 30 },
  { value: "oneMinute", label: "1 min", seconds: 60 },
  { value: "custom", label: "Custom", seconds: null },
];
