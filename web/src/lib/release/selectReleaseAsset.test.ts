import { describe, expect, it } from "vitest";

import { selectReleaseAsset } from "./selectReleaseAsset";

const release = {
  assets: [
    {
      name: "checksums.txt",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1/checksums.txt",
    },
    {
      name: "SortDock-1.0.0-mac.dmg.blockmap",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1/SortDock-1.0.0-mac.dmg.blockmap",
    },
    {
      name: "SortDock-1.0.0-mac.dmg",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1/SortDock-1.0.0-mac.dmg",
    },
    {
      name: "SortDock-1.0.0-windows-setup.exe",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1/SortDock-1.0.0-windows-setup.exe",
    },
  ],
};

describe("selectReleaseAsset", () => {
  it("returns the installer for each computer", () => {
    expect(selectReleaseAsset(release, "mac")?.name).toBe(
      "SortDock-1.0.0-mac.dmg",
    );
    expect(selectReleaseAsset(release, "windows")?.name).toBe(
      "SortDock-1.0.0-windows-setup.exe",
    );
  });

  it("accepts pkg and msi installers", () => {
    const assets = (name: string) => ({
      assets: [{ name, browser_download_url: `https://example.com/${name}` }],
    });

    expect(selectReleaseAsset(assets("SortDock.pkg"), "mac")?.name).toBe(
      "SortDock.pkg",
    );
    expect(selectReleaseAsset(assets("SortDock.msi"), "windows")?.name).toBe(
      "SortDock.msi",
    );
  });

  it("rejects source files and unsafe download URLs", () => {
    expect(
      selectReleaseAsset(
        {
          assets: [
            {
              name: "SortDock.exe",
              browser_download_url: "http://example.com/SortDock.exe",
            },
            {
              name: "README.md",
              browser_download_url: "https://example.com/README.md",
            },
          ],
        },
        "windows",
      ),
    ).toBeNull();
  });

  it("returns null for malformed release data", () => {
    expect(selectReleaseAsset(null, "mac")).toBeNull();
    expect(selectReleaseAsset({ assets: "missing" }, "windows")).toBeNull();
  });
});
