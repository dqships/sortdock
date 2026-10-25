import { describe, expect, it } from "vitest";

import { appStoreUrl } from "./appStoreUrl";
import { buildDesktopDownloads } from "./buildDesktopDownloads";
import { downloadAvailabilityLabel } from "./downloadAvailabilityLabel";

const asset = (name: string) => ({
  name,
  browser_download_url: `https://github.com/dqships/sortdock/releases/download/v1.2.0/${name}`,
});

describe("buildDesktopDownloads", () => {
  it("links both computers to the site's own download routes", () => {
    const downloads = buildDesktopDownloads({
      tag_name: "v1.2.0",
      assets: [
        asset("SortDock-1.2.0-mac.dmg"),
        asset("SortDock-1.2.0-windows-setup.exe"),
      ],
    });

    expect(downloads).toEqual({
      version: "v1.2.0",
      options: {
        mac: { kind: "direct", href: "/download/mac" },
        windows: { kind: "direct", href: "/download/windows" },
      },
    });
    expect(downloadAvailabilityLabel(downloads)).toBe(
      "v1.2.0 for Mac and Windows",
    );
  });

  it("keeps Mac on the App Store and Windows coming soon without a release", () => {
    const downloads = buildDesktopDownloads(null);

    expect(downloads).toEqual({
      version: null,
      options: {
        mac: { kind: "app-store", href: appStoreUrl },
        windows: { kind: "coming-soon" },
      },
    });
    expect(downloadAvailabilityLabel(downloads)).toBe(
      "Available on the Mac App Store",
    );
  });

  it("handles a release that only has a Windows installer", () => {
    const downloads = buildDesktopDownloads({
      tag_name: "v1.2.0",
      assets: [asset("SortDock-1.2.0-windows-setup.exe")],
    });

    expect(downloads.options.mac).toEqual({
      kind: "app-store",
      href: appStoreUrl,
    });
    expect(downloads.options.windows).toEqual({
      kind: "direct",
      href: "/download/windows",
    });
    expect(downloadAvailabilityLabel(downloads)).toBe("v1.2.0 for Windows");
  });
});
