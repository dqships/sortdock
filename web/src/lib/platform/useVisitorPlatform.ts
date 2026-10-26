"use client";

import { useSyncExternalStore } from "react";

import type { DesktopPlatform } from "~/lib/release/DesktopPlatform";

import { detectDesktopPlatform } from "./detectDesktopPlatform";

type NavigatorWithHints = Navigator & {
  userAgentData?: { platform?: string };
};

const subscribe = () => () => undefined;

function readPlatform(): DesktopPlatform | null {
  const browser = navigator as NavigatorWithHints;
  return detectDesktopPlatform(
    browser.userAgent,
    browser.userAgentData?.platform ?? "",
  );
}

/** The visitor's computer in the browser, and null while rendering on the server. */
export function useVisitorPlatform(): DesktopPlatform | null {
  return useSyncExternalStore(subscribe, readPlatform, () => null);
}
