import type { Metadata } from "next";

import { siteMetadata } from "./siteMetadata";

/**
 * Metadata for one page. The root layout's canonical and og:url point at the
 * home page, so every other page sets its own here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...siteMetadata.openGraph,
      url: path,
      title: `${title} | SortDock`,
      description,
    },
    twitter: {
      ...siteMetadata.twitter,
      title: `${title} | SortDock`,
      description,
    },
  };
}
