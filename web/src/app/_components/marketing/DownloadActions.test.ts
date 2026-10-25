import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { appStoreUrl } from "~/lib/release/appStoreUrl";
import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";

import { DownloadActions } from "./DownloadActions";

function render(downloads: DesktopDownloads): string {
  return renderToStaticMarkup(createElement(DownloadActions, { downloads }));
}

describe("DownloadActions", () => {
  it("offers direct downloads for both computers, Mac first before the browser is known", () => {
    const markup = render({
      version: "v1.0.0",
      options: {
        mac: { kind: "direct", href: "/download/mac" },
        windows: { kind: "direct", href: "/download/windows" },
      },
    });

    expect(markup).toContain('href="/download/mac"');
    expect(markup).toContain('href="/download/windows"');
    expect(markup.indexOf("Download for Mac")).toBeLessThan(
      markup.indexOf("Download for Windows"),
    );
  });

  it("links Mac to the App Store and shows Windows as coming soon before a release", () => {
    const markup = render({
      version: null,
      options: {
        mac: { kind: "app-store", href: appStoreUrl },
        windows: { kind: "coming-soon" },
      },
    });

    expect(markup).toContain(`href="${appStoreUrl}"`);
    expect(markup).toContain(">Download on the App Store</a>");
    expect(markup).toContain("Windows coming soon");
    expect(markup).toContain("bg-[var(--accent-deep)]");
    expect(markup).toContain('role="status"');
  });
});
