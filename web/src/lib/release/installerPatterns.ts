import type { DesktopPlatform } from "./DesktopPlatform";

/** Installer file endings attached to a GitHub release for each computer. */
export const installerPatterns: Record<DesktopPlatform, RegExp> = {
  mac: /\.(?:dmg|pkg)$/i,
  windows: /\.(?:exe|msi)$/i,
};
