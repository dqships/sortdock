import { describe, expect, it, vi } from "vitest";

import { getReleaseState } from "./getReleaseState";

type NextFetchInit = RequestInit & {
  next: { revalidate: number };
};

describe("getReleaseState", () => {
  it("returns an available download for a published Mac asset", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        tag_name: "v1.0.0",
        assets: [
          {
            name: "SortDock.dmg",
            browser_download_url:
              "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock.dmg",
          },
        ],
      }),
    );

    await expect(getReleaseState(request)).resolves.toEqual({
      status: "available",
      version: "v1.0.0",
      downloadUrl:
        "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock.dmg",
    });
    const requestCall = request.mock.calls[0];
    const requestInit = requestCall?.[1] as NextFetchInit | undefined;

    expect(requestCall?.[0]).toBe(
      "https://api.github.com/repos/dqships/sortdock/releases/latest",
    );
    expect(requestInit?.headers).toMatchObject({
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    });
    expect(requestInit?.next).toEqual({ revalidate: 900 });
  });

  it("stays coming soon when GitHub has no published release", async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 404 }));

    await expect(getReleaseState(request)).resolves.toEqual({
      status: "coming-soon",
    });
  });

  it("stays coming soon when a release has no Mac asset", async () => {
    const request = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        tag_name: "v1.0.0",
        assets: [],
      }),
    );

    await expect(getReleaseState(request)).resolves.toEqual({
      status: "coming-soon",
    });
  });

  it("fails safely when GitHub cannot be reached", async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("network unavailable"));

    await expect(getReleaseState(request)).resolves.toEqual({
      status: "coming-soon",
    });
  });
});
