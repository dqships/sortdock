import { siteUrl } from "~/lib/site/siteUrl";

/** The Markdown 404 body: what went wrong and where to go instead. */
export function notFoundMarkdown(pathname: string): string {
  return `# Page not found

There is no page at \`${pathname}\` on the SortDock website.

- [Home](${siteUrl}/): what SortDock does and how to download it
- [llms.txt](${siteUrl}/llms.txt): every page on this site, for agents
- [Sitemap](${siteUrl}/sitemap.xml)
`;
}
