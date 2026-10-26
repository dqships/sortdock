import type { DesktopDownloads } from "./DesktopDownloads";
import { desktopPlatforms } from "./desktopPlatforms";
import { platformNames } from "./platformNames";

export function downloadAvailabilityLabel(downloads: DesktopDownloads): string {
  const direct = desktopPlatforms.filter(
    (platform) => downloads.options[platform].kind === "direct",
  );

  if (direct.length > 0) {
    const names = direct
      .map((platform) => platformNames[platform])
      .join(" and ");
    return downloads.version
      ? `${downloads.version} for ${names}`
      : `Available for ${names}`;
  }

  return downloads.options.mac.kind === "app-store"
    ? "Available on the Mac App Store"
    : "Coming soon";
}
