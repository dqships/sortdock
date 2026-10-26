import { supportEmail } from "./supportEmail";
import { appStoreUrl } from "~/lib/release/appStoreUrl";

import { siteMetadata } from "./siteMetadata";
import { siteUrl } from "./siteUrl";

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "SortDock",
      url: siteUrl,
      description: siteMetadata.description,
      publisher: { "@id": "https://www.followusai.com/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.followusai.com/#organization",
      name: "FollowUs AI",
      legalName: "FollowUs AI LLC",
      url: "https://www.followusai.com",
      logo: "https://www.followusai.com/apple-icon.png",
      email: supportEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: supportEmail,
        availableLanguage: "en",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Swartz Creek",
        addressRegion: "MI",
        addressCountry: "US",
      },
      sameAs: ["https://github.com/dqships", "https://x.com/dqships"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#app`,
      name: "SortDock",
      url: siteUrl,
      description: siteMetadata.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS, Windows",
      downloadUrl: `${siteUrl}/#download`,
      installUrl: appStoreUrl,
      image: `${siteUrl}/opengraph-image`,
      publisher: { "@id": "https://www.followusai.com/#organization" },
    },
  ],
};
