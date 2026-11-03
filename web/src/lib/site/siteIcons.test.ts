import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import manifest from "~/app/manifest";

import { siteMetadata } from "./siteMetadata";

type IconEntry = string | { url: string | URL };

function iconUrls(): string[] {
  const icons = siteMetadata.icons as Record<string, IconEntry | IconEntry[]>;
  const fromMetadata = Object.values(icons)
    .flat()
    .map((icon) => (typeof icon === "string" ? icon : String(icon.url)));
  const fromManifest = (manifest().icons ?? []).map((icon) => icon.src);

  return [...fromMetadata, ...fromManifest];
}

describe("site icons", () => {
  it("serves every linked icon from public/", () => {
    const urls = iconUrls();

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(existsSync(join(process.cwd(), "public", url)), url).toBe(true);
    }
  });

  it("links the 48 px favicon.ico and the 96 and 192 px PNGs", () => {
    expect(siteMetadata.icons).toMatchObject({
      icon: expect.arrayContaining([
        { url: "/favicon.ico", sizes: "48x48" },
        expect.objectContaining({ url: "/icons/sortdock-96.png" }),
        expect.objectContaining({ url: "/icons/sortdock-192.png" }),
      ]),
    });
  });
});
