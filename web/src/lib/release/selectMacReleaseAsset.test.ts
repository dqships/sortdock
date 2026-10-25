import { describe, expect, it } from "vitest";

import { selectMacReleaseAsset } from "./selectMacReleaseAsset";

describe("selectMacReleaseAsset", () => {
  it("returns the first published Mac download asset", () => {
    const release = {
      assets: [
        {
          name: "checksums.txt",
          browser_download_url:
            "https://github.com/dqships/sortdock/releases/download/v1/checksums.txt",
        },
        {
          name: "SortDock.dmg",
          browser_download_url:
            "https://github.com/dqships/sortdock/releases/download/v1/SortDock.dmg",
        },
      ],
    };

    expect(selectMacReleaseAsset(release)).toEqual({
      name: "SortDock.dmg",
      downloadUrl:
        "https://github.com/dqships/sortdock/releases/download/v1/SortDock.dmg",
    });
  });

  it("accepts pkg and zip distributions", () => {
    expect(
      selectMacReleaseAsset({
        assets: [
          {
            name: "SortDock.pkg",
            browser_download_url: "https://example.com/SortDock.pkg",
          },
        ],
      })?.name,
    ).toBe("SortDock.pkg");

    expect(
      selectMacReleaseAsset({
        assets: [
          {
            name: "SortDock.app.zip",
            browser_download_url: "https://example.com/SortDock.app.zip",
          },
        ],
      })?.name,
    ).toBe("SortDock.app.zip");
  });

  it("rejects source files and unsafe download URLs", () => {
    expect(
      selectMacReleaseAsset({
        assets: [
          {
            name: "Source.zip",
            browser_download_url: "http://example.com/Source.zip",
          },
          {
            name: "README.md",
            browser_download_url: "https://example.com/README.md",
          },
        ],
      }),
    ).toBeNull();
  });

  it("returns null for malformed release data", () => {
    expect(selectMacReleaseAsset(null)).toBeNull();
    expect(selectMacReleaseAsset({ assets: "missing" })).toBeNull();
  });
});
