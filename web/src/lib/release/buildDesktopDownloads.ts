import type { DesktopDownloads } from "./DesktopDownloads";
import type { DesktopPlatform } from "./DesktopPlatform";
import type { DownloadOption } from "./DownloadOption";
import { appStoreUrl } from "./appStoreUrl";
import { downloadPath } from "./downloadPath";
import { readReleaseVersion } from "./readReleaseVersion";
import { selectReleaseAsset } from "./selectReleaseAsset";

function optionFor(
  release: unknown,
  platform: DesktopPlatform,
): DownloadOption {
  if (selectReleaseAsset(release, platform)) {
    return { kind: "direct", href: downloadPath(platform) };
  }

  // Mac always has somewhere to go, even before the first direct release.
  return platform === "mac"
    ? { kind: "app-store", href: appStoreUrl }
    : { kind: "coming-soon" };
}

export function buildDesktopDownloads(release: unknown): DesktopDownloads {
  const options = {
    mac: optionFor(release, "mac"),
    windows: optionFor(release, "windows"),
  };
  const hasDirectDownload = Object.values(options).some(
    (option) => option.kind === "direct",
  );

  return {
    version: hasDirectDownload ? readReleaseVersion(release) : null,
    options,
  };
}
