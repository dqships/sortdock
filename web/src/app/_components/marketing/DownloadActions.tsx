"use client";

import { orderPlatforms } from "~/lib/platform/orderPlatforms";
import { useVisitorPlatform } from "~/lib/platform/useVisitorPlatform";
import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";

import { DownloadButton } from "./DownloadButton";

type DownloadActionsProps = {
  downloads: DesktopDownloads;
};

/** Mac and Windows downloads, with the visitor's own computer first. */
export function DownloadActions({ downloads }: DownloadActionsProps) {
  const platforms = orderPlatforms(useVisitorPlatform());
  const primaryPlatform = platforms.find(
    (platform) => downloads.options[platform].kind !== "coming-soon",
  );

  return (
    <>
      {platforms.map((platform) => (
        <DownloadButton
          key={platform}
          platform={platform}
          option={downloads.options[platform]}
          isPrimary={platform === primaryPlatform}
        />
      ))}
    </>
  );
}
