import { appStoreUrl } from "~/lib/release/appStoreUrl";
import { siteUrl } from "~/lib/site/siteUrl";

import { supportEmail } from "~/lib/site/supportEmail";

/** The home page as Markdown, served to agents that ask for text/markdown and at /index.md. */
export function homeMarkdown(): string {
  return `# SortDock

> SortDock is a small Mac and Windows app that watches your Downloads folder and moves new files into folders you choose, by file type or by words in the filename.

## How it works

- Choose a folder to watch, usually Downloads.
- Add rules. Keyword rules match words in the filename, such as invoice, receipt, or 1099. Capitals and the file extension do not affect a match. Rules are checked from top to bottom, then SortDock falls back to the file type (.pdf to PDFs, .png to Images, .dmg to Apps).
- SortDock waits a few seconds before moving, so unfinished downloads are not touched.
- Ask First: SortDock asks before each move. Move it, choose another folder, leave it, or ask later.
- Auto Move: once your rules feel right, SortDock moves files quietly in the background.
- If a file with the same name already exists, SortDock keeps both and gives the new one a safe name, such as example (1).pdf. It never overwrites a file.
- Pause or resume sorting from the menu bar on Mac or the system tray on Windows.

## Privacy

SortDock runs on your computer. There are no accounts, no cloud sync, no analytics, and no tracking. Your rules and folder choices stay on your computer.

## Download

- Mac: [Mac App Store](${appStoreUrl}), or the download on ${siteUrl}/#download
- Windows: the installer on ${siteUrl}/#download

## More

- [About](${siteUrl}/about): who makes SortDock
- [Support](${siteUrl}/support): common questions. Email: ${supportEmail}
- [Privacy](${siteUrl}/privacy)
- [Terms](${siteUrl}/terms)
- [Source code](https://github.com/dqships/sortdock)

---
HTML version: ${siteUrl}/. Index for agents: ${siteUrl}/llms.txt
`;
}
