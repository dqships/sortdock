import type { DesktopPlatform } from "~/lib/release/DesktopPlatform";
import { desktopPlatforms } from "~/lib/release/desktopPlatforms";

/** Puts the visitor's own computer first. Mac leads when it is unknown. */
export function orderPlatforms(
  preferred: DesktopPlatform | null,
): DesktopPlatform[] {
  return preferred
    ? [
        preferred,
        ...desktopPlatforms.filter((platform) => platform !== preferred),
      ]
    : [...desktopPlatforms];
}
