import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const release = {
  tag_name: "v1.0.0",
  assets: [
    {
      name: "SortDock-1.0.0-windows-setup.exe",
      browser_download_url:
        "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock-1.0.0-windows-setup.exe",
    },
  ],
};

function get(platform: string) {
  return GET(new Request(`https://sortdock.example/download/${platform}`), {
    params: Promise.resolve({ platform }),
  });
}

describe("GET /download/[platform]", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("redirects to the newest installer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(release)));

    const response = await get("windows");

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      release.assets[0]!.browser_download_url,
    );
  });

  it("sends people back to the download section when nothing is published", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );

    const response = await get("windows");

    expect(response.headers.get("location")).toBe(
      "https://sortdock.example/#download",
    );
  });

  it("does not know other computers", async () => {
    const response = await get("linux");
    expect(response.status).toBe(404);
  });
});
