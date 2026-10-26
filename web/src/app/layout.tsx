import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";

import { SiteJsonLd } from "~/app/_components/SiteJsonLd";
import { siteMetadata } from "~/lib/site/siteMetadata";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
