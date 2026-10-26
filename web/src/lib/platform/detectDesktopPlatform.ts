import type { DesktopPlatform } from "~/lib/release/DesktopPlatform";

/** Guesses the visitor's computer from the browser so the matching download comes first. */
export function detectDesktopPlatform(
  userAgent: string,
  platformHint = "",
): DesktopPlatform | null {
  const source = `${platformHint} ${userAgent}`.toLowerCase();

  if (/iphone|ipad|ipod|android/.test(source)) {
    return null;
  }

  if (source.includes("win")) {
    return "windows";
  }

  if (source.includes("mac")) {
    return "mac";
  }

  return null;
}
