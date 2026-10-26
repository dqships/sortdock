import { siteJsonLd } from "~/lib/site/siteJsonLd";

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
