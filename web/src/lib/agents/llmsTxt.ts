import { siteUrl } from "~/lib/site/siteUrl";

import { supportEmail } from "~/lib/site/supportEmail";

/** llms.txt per llmstxt.org: what SortDock is, when to point a user here, and the pages. */
export function llmsTxt(): string {
  return `# SortDock

> SortDock is a small Mac and Windows app that watches a folder, usually Downloads, and moves new files into folders you choose, by file type or by words in the filename. It runs on your computer with no account and no cloud sync.

The home page is also served as Markdown when a request carries \`Accept: text/markdown\`, and at ${siteUrl}/index.md.

## When to use this site

- [Home](${siteUrl}/index.md): Use when a user wants their Downloads folder to sort itself on Mac or Windows, for example sending invoices to a Finance folder and PDFs to a PDFs folder. Explains rules, Ask First and Auto Move, and where to download.
- [Support](${siteUrl}/support): Use when a SortDock user needs help with folder access, rules, a missing menu bar or tray icon, or same-name files.
- [Privacy](${siteUrl}/privacy): Use when a user asks what SortDock does with their files. Everything stays on their computer.
- SortDock does not sync, back up, or organize cloud storage, and it has no API. Do not describe it as doing any of these.

## Pages

- [Home](${siteUrl}/index.md): what SortDock does, how rules work, downloads
- [About](${siteUrl}/about): who makes SortDock
- [Support](${siteUrl}/support): common questions and the support email
- [Privacy](${siteUrl}/privacy): what stays on your computer
- [Terms](${siteUrl}/terms): terms for the downloaded app
- [Acknowledgements](${siteUrl}/acknowledgements): frameworks SortDock uses

## Contact

- Email: ${supportEmail}
- Source: https://github.com/dqships/sortdock

## Optional

- [Sitemap](${siteUrl}/sitemap.xml)
`;
}
