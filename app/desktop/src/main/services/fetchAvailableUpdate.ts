import type { AppUpdate } from "../../shared/models/AppUpdate";
import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";
import { isRecord } from "../decoding/isRecord";
import { isNewerVersion } from "./isNewerVersion";
import { releaseHasPlatformAsset } from "./releaseHasPlatformAsset";
import { siteLinks } from "./siteLinks";

const latestReleaseUrl = "https://api.github.com/repos/dqships/sortdock/releases/latest";

/** Returns an update only when a newer release has an installer for this computer. */
export async function fetchAvailableUpdate(
  installedVersion: string,
  platform: DesktopPlatform,
  request: typeof fetch = fetch,
): Promise<AppUpdate | null> {
  const response = await request(latestReleaseUrl, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "SortDock" },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    return null;
  }

  const release: unknown = await response.json();

  if (!isRecord(release) || typeof release.tag_name !== "string") {
    return null;
  }

  if (!isNewerVersion(release.tag_name, installedVersion) || !releaseHasPlatformAsset(release, platform)) {
    return null;
  }

  return {
    version: release.tag_name.replace(/^[^\d]*/, "").slice(0, 32),
    downloadUrl: siteLinks.download(platform),
  };
}
