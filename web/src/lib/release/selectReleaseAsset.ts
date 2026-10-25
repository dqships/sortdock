import type { DesktopPlatform } from "./DesktopPlatform";
import { installerPatterns } from "./installerPatterns";
import { isRecord } from "./isRecord";
import type { ReleaseAsset } from "./ReleaseAsset";

export function selectReleaseAsset(
  release: unknown,
  platform: DesktopPlatform,
): ReleaseAsset | null {
  if (!isRecord(release) || !Array.isArray(release.assets)) {
    return null;
  }

  for (const asset of release.assets) {
    if (!isRecord(asset)) {
      continue;
    }

    const name = asset.name;
    const downloadUrl = asset.browser_download_url;

    if (
      typeof name !== "string" ||
      !installerPatterns[platform].test(name) ||
      typeof downloadUrl !== "string"
    ) {
      continue;
    }

    try {
      const parsedUrl = new URL(downloadUrl);
      if (parsedUrl.protocol === "https:") {
        return { downloadUrl: parsedUrl.toString(), name };
      }
    } catch {
      continue;
    }
  }

  return null;
}
