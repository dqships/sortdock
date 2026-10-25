import type { Device, ScreenshotFontId, SlideLayout, Theme, ThemeId } from "./types";

// SortDock needs only the Mac App Store's 16:10 landscape screenshot size.
export const MAC_CANVAS = { w: 2880, h: 1800 } as const;
export const CANVAS: Record<Device, { w: number; h: number }> = { mac: MAC_CANVAS };
export type ExportSize = { label: string; w: number; h: number };
export const EXPORT_SIZES: Record<Device, ExportSize[]> = { mac: [{ label: "Mac App Store", ...MAC_CANVAS }] };
export function getExportSizes(): ExportSize[] { return EXPORT_SIZES.mac; }

export const MAC_WINDOW_RATIO = 16 / 10;
export function macWindowWidth(): number { return 0.74; }
export function macWindowWidthSmall(): number { return 0.52; }

export const DEFAULT_THEME_ID: ThemeId = "sortdock-navy";
export const DEFAULT_SCREENSHOT_FONT_ID: ScreenshotFontId = "system-sans";
export const SCREENSHOT_FONTS: Record<ScreenshotFontId, { name: string; family: string }> = {
  "template-serif": { name: "Editorial Serif", family: "Georgia, 'Times New Roman', serif" },
  "system-sans": { name: "Modern Sans", family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif" },
  "classic-serif": { name: "Classic Serif", family: "Georgia, 'Times New Roman', serif" },
  "avenir-next": { name: "Avenir Next", family: '"Avenir Next", Avenir, sans-serif' },
  "helvetica-neue": { name: "Helvetica Neue", family: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  "american-typewriter": { name: "American Typewriter", family: '"American Typewriter", Georgia, serif' },
  "baskerville": { name: "Baskerville", family: "Baskerville, Georgia, serif" },
  "optima": { name: "Optima", family: "Optima, 'Palatino Linotype', serif" },
  "palatino": { name: "Palatino", family: "Palatino, 'Palatino Linotype', serif" },
  "futura": { name: "Futura", family: "Futura, 'Trebuchet MS', sans-serif" },
  "self-hosted": { name: "Import a font", family: '"CustomScreenshotFont", Georgia, serif' },
};

export const THEMES: Record<string, Theme> = {
  "sortdock-navy": { id: "sortdock-navy", name: "SortDock Navy", bg: "#E9F4FA", bgAlt: "#102E45", fg: "#12344C", fgAlt: "#F6FBFE", accent: "#1976B9", muted: "#557488" },
  "sortdock-ice": { id: "sortdock-ice", name: "SortDock Ice", bg: "#F4FAFD", bgAlt: "#173B56", fg: "#173B56", fgAlt: "#F4FAFD", accent: "#3E9AD5", muted: "#58758A" },
  "sortdock-night": { id: "sortdock-night", name: "SortDock Night", bg: "#14344B", bgAlt: "#E8F4FA", fg: "#F5FBFE", fgAlt: "#14344B", accent: "#75C1ED", muted: "#B4D1E1" },
};
export function themeById(themeId: string | undefined): Theme { return THEMES[themeId || ""] || THEMES[DEFAULT_THEME_ID]; }
export function hasTheme(themeId: string | undefined): boolean { return !!themeId && !!THEMES[themeId]; }

export const STORAGE_KEY = "sortdock-mac-screenshots:project:v1";
export const PROJECT_SCHEMA_VERSION = 3;
export const DEVICE_LABEL: Record<Device, string> = { mac: "Mac" };
export const LAYOUT_LABEL: Record<SlideLayout, string> = { hero: "Hero window", "window-bottom": "Window bottom", "window-top": "Window top", "two-windows": "Two windows", "no-window": "Type only" };
export const LAYOUT_HINT: Record<SlideLayout, string> = { hero: "Headline with a centered SortDock window", "window-bottom": "Headline above the app window", "window-top": "App window above the headline", "two-windows": "Two overlapping app windows", "no-window": "A focused type-led screen" };
