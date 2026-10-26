import { appStoreUrl } from "./appStoreUrl";
import type { DesktopPlatform } from "./DesktopPlatform";
import { selectReleaseAsset } from "./selectReleaseAsset";

/** Where `/download/<platform>` sends people: the installer, the App Store, or nowhere yet. */
export function resolveDownloadTarget(
  release: unknown,
  platform: DesktopPlatform,
): string | null {
  const asset = selectReleaseAsset(release, platform);

  if (asset) {
    return asset.downloadUrl;
  }

  return platform === "mac" ? appStoreUrl : null;
}
