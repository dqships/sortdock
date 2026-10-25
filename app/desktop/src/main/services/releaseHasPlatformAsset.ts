import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";
import { isRecord } from "../decoding/isRecord";

const installerPatterns: Record<DesktopPlatform, RegExp | null> = {
  mac: /\.dmg$/i,
  windows: /\.exe$/i,
  linux: null,
};

export function releaseHasPlatformAsset(release: Record<string, unknown>, platform: DesktopPlatform): boolean {
  const pattern = installerPatterns[platform];

  if (!pattern || !Array.isArray(release.assets)) {
    return false;
  }

  return release.assets.some((asset) => isRecord(asset) && typeof asset.name === "string" && pattern.test(asset.name));
}
