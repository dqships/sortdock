import type { DesktopPlatform } from "./DesktopPlatform";
import { desktopPlatforms } from "./desktopPlatforms";

export function isDesktopPlatform(value: string): value is DesktopPlatform {
  return (desktopPlatforms as readonly string[]).includes(value);
}
