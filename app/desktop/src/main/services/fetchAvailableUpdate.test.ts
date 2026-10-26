import { describe, expect, it, vi } from "vitest";

import { fetchAvailableUpdate } from "./fetchAvailableUpdate";

function releaseResponse(tag: string, assetNames: string[]) {
  return vi.fn<typeof fetch>().mockResolvedValue(
    Response.json({ tag_name: tag, assets: assetNames.map((name) => ({ name })) }),
  );
}

describe("fetchAvailableUpdate", () => {
  it("offers a newer release that has an installer for this computer", async () => {
    const request = releaseResponse("v1.2.0", ["SortDock-1.2.0-mac.dmg", "SortDock-1.2.0-windows-setup.exe"]);

    await expect(fetchAvailableUpdate("1.0.0", "windows", request)).resolves.toEqual({
      version: "1.2.0",
      downloadUrl: "https://sortdock.vercel.app/download/windows",
    });
  });

  it("stays quiet when the release has nothing for this computer", async () => {
    const request = releaseResponse("v1.2.0", ["SortDock-1.2.0-mac.dmg"]);
    await expect(fetchAvailableUpdate("1.0.0", "windows", request)).resolves.toBeNull();
  });

  it("stays quiet when the installed version is current", async () => {
    const request = releaseResponse("v1.0.0", ["SortDock-1.0.0-mac.dmg"]);
    await expect(fetchAvailableUpdate("1.0.0", "mac", request)).resolves.toBeNull();
  });

  it("stays quiet when GitHub answers with an error", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 403 }));
    await expect(fetchAvailableUpdate("1.0.0", "mac", request)).resolves.toBeNull();
  });
});
