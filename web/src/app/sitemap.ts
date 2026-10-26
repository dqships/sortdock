import type { MetadataRoute } from "next";

import { siteUrl } from "~/lib/site/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/support",
    "/privacy",
    "/terms",
    "/acknowledgements",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
