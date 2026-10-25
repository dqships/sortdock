import { buildDesktopDownloads } from "./buildDesktopDownloads";
import type { DesktopDownloads } from "./DesktopDownloads";
import { fetchLatestRelease } from "./fetchLatestRelease";

export async function getDesktopDownloads(
  request: typeof fetch = fetch,
): Promise<DesktopDownloads> {
  return buildDesktopDownloads(await fetchLatestRelease(request));
}
