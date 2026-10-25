import type { AppearanceMode } from "../models/AppearanceMode";

export const appearanceOptions: readonly { value: AppearanceMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];
