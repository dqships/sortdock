import type { DesktopPlatform } from "./DesktopPlatform";

/** The site's own stable download link, which always points at the newest installer. */
export function downloadPath(platform: DesktopPlatform): string {
  return `/download/${platform}`;
}
