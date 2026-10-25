import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { appStoreRelease } from "~/lib/release/appStoreRelease";

import { ReleaseAction } from "./ReleaseAction";

describe("ReleaseAction", () => {
  it.each(["hero", "nav", "final"] as const)(
    "links the %s action to the live App Store listing",
    (placement) => {
      const markup = renderToStaticMarkup(
        createElement(ReleaseAction, {
          placement,
          releaseState: appStoreRelease,
        }),
      );

      expect(markup).toContain(
        'href="https://apps.apple.com/us/app/my-file-manager-sortdock/id6804060639"',
      );
      expect(markup).toContain(
        placement === "nav"
          ? ">App Store</a>"
          : ">Download on the App Store</a>",
      );
      expect(markup).not.toContain("Coming soon");
    },
  );

  it("renders coming soon as a non-interactive status", () => {
    const markup = renderToStaticMarkup(
      createElement(ReleaseAction, {
        placement: "hero",
        releaseState: { status: "coming-soon" },
      }),
    );

    expect(markup).toContain("Coming soon for Mac");
    expect(markup).toContain('role="status"');
    expect(markup).not.toContain("<a");
  });

  it("renders a direct download when a release is available", () => {
    const markup = renderToStaticMarkup(
      createElement(ReleaseAction, {
        placement: "hero",
        releaseState: {
          status: "available",
          version: "v1.0.0",
          downloadUrl:
            "https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock.dmg",
        },
      }),
    );

    expect(markup).toContain("Download for Mac");
    expect(markup).toContain(
      'href="https://github.com/dqships/sortdock/releases/download/v1.0.0/SortDock.dmg"',
    );
  });
});
