import type { Metadata } from "next";

import { siteUrl } from "./siteUrl";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SortDock | Keep Downloads clean",
    template: "%s | SortDock",
  },
  description:
    "SortDock sorts new downloads on Mac and Windows by file type or words in the filename, then moves them to folders you choose.",
  applicationName: "SortDock",
  keywords: [
    "Downloads organizer for Mac",
    "Mac file organizer",
    "Downloads organizer for Windows",
    "automatic file sorting",
    "Downloads folder cleanup",
    "keyword file routing",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/sortdock-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/sortdock-192.png", sizes: "192x192", type: "image/png" },
      {
        url: "/icons/sortdock-dark-32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/sortdock-dark-192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/sortdock-180.png", sizes: "180x180", type: "image/png" },
      {
        url: "/icons/sortdock-dark-180.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "SortDock",
    url: "/",
    title: "Keep Downloads clean without babysitting every file.",
    description:
      "Route downloads on Mac or Windows by file type or words like invoice and receipt, then send them to folders you choose.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SortDock",
    description:
      "Sort downloads on Mac and Windows by file type or words in the filename.",
    images: ["/opengraph-image"],
  },
};
