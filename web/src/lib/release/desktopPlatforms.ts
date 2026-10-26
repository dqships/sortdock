import type { DesktopPlatform } from "./DesktopPlatform";

export const desktopPlatforms = [
  "mac",
  "windows",
] as const satisfies readonly DesktopPlatform[];
