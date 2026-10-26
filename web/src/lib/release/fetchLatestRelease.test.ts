import { describe, expect, it, vi } from "vitest";

import { fetchLatestRelease } from "./fetchLatestRelease";

type NextFetchInit = RequestInit & {
  next: { revalidate: number };
};

describe("fetchLatestRelease", () => {
  it("asks GitHub for the latest release and caches it for 15 minutes", async () => {
    const release = { tag_name: "v1.0.0", assets: [] };
    const request = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(release));

    await expect(fetchLatestRelease(request)).resolves.toEqual(release);

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

  it("returns null when GitHub has no published release", async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 404 }));

    await expect(fetchLatestRelease(request)).resolves.toBeNull();
  });

  it("returns null when GitHub cannot be reached", async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error("network unavailable"));

    await expect(fetchLatestRelease(request)).resolves.toBeNull();
  });
});
