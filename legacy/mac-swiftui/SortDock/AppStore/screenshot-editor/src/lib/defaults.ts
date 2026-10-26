import { DEFAULT_LOCALE } from "./locale";
import { DEFAULT_SCREENSHOT_FONT_ID, DEFAULT_THEME_ID, PROJECT_SCHEMA_VERSION } from "./constants";
import type { ProjectState, Slide } from "./types";

let sequence = 0;
export const nid = () => `sortdock-${Date.now().toString(36)}-${(sequence++).toString(36)}`;
const en = (text: string) => ({ [DEFAULT_LOCALE]: text });
const capture = "/screenshots/apple/mac/en/01-main.jpeg";
export const SORTDOCK_STARTER_SLIDES: Slide[] = [
  { id: "sortdock-main", layout: "hero", label: en("SORTDOCK"), headline: en("Your downloads,\nsorted your way"), screenshot: capture },
  { id: "sortdock-keywords", layout: "window-bottom", label: en("ROUTING RULES"), headline: en("See every route\nat a glance"), screenshot: capture },
  { id: "sortdock-ask", layout: "window-top", label: en("STAY IN CONTROL"), headline: en("Ask first.\nMove when ready."), screenshot: capture, inverted: true },
  { id: "sortdock-auto", layout: "hero", label: en("AUTO MOVE"), headline: en("Automatic when\nyou want it"), screenshot: capture },
  { id: "sortdock-pause", layout: "window-top", label: en("IN YOUR CONTROL"), headline: en("Pause sorting\nanytime"), screenshot: capture, inverted: true },
];
export const DEFAULT_PROJECT: ProjectState = { schemaVersion: PROJECT_SCHEMA_VERSION, appName: "SortDock", themeId: DEFAULT_THEME_ID, fontId: DEFAULT_SCREENSHOT_FONT_ID, connectedCanvas: true, locales: [DEFAULT_LOCALE], locale: DEFAULT_LOCALE, device: "mac", orientation: "landscape", appIcon: "", slidesByDevice: { mac: SORTDOCK_STARTER_SLIDES } };
export function newSlide(layout: Slide["layout"] = "window-bottom"): Slide { return { id: nid(), layout, label: en("NEW SCREEN"), headline: en("One clear\nidea."), screenshot: capture }; }
