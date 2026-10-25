import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SortDock",
    short_name: "SortDock",
    description:
      "Sort new downloads on Mac and Windows by file type or words in the filename.",
    start_url: "/",
    display: "standalone",
    background_color: "#E9F4FA",
    theme_color: "#12344C",
    icons: [
      {
        src: "/icons/sortdock-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/sortdock-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/sortdock-glass-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/sortdock-glass-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
