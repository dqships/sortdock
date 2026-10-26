import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";

export function currentPlatform(): DesktopPlatform {
  switch (process.platform) {
    case "darwin":
      return "mac";
    case "win32":
      return "windows";
    default:
      return "linux";
  }
}
