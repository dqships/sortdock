import { describe, expect, it } from "vitest";

import { appStoreUrl } from "./appStoreUrl";
import { resolveDownloadTarget } from "./resolveDownloadTarget";

const release = {
  assets: [
    {
      name: "SortDock-1.0.0-windows-setup.exe",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock-1.0.0-windows-setup.exe",
    },
  ],
};

describe("resolveDownloadTarget", () => {
  it("sends people straight to the installer", () => {
    expect(resolveDownloadTarget(release, "windows")).toBe(
      "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock-1.0.0-windows-setup.exe",
    );
  });

  it("falls back to the App Store for Mac and nowhere for Windows", () => {
    expect(resolveDownloadTarget(release, "mac")).toBe(appStoreUrl);
    expect(resolveDownloadTarget(null, "windows")).toBeNull();
  });
});
