import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";

const siteUrl = "https://sortdock.vercel.app";

export const siteLinks = {
  privacy: `${siteUrl}/privacy`,
  terms: `${siteUrl}/terms`,
  download: (platform: DesktopPlatform) => `${siteUrl}/download/${platform === "windows" ? "windows" : "mac"}`,
};
