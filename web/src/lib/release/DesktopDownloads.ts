import type { DesktopPlatform } from "./DesktopPlatform";
import type { DownloadOption } from "./DownloadOption";

export type DesktopDownloads = {
  version: string | null;
  options: Record<DesktopPlatform, DownloadOption>;
};
