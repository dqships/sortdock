import { app } from "electron";
import { join } from "node:path";

import { isDirectory } from "./isDirectory";
import { isSamePath } from "./isSamePath";

/** The Downloads folder. Some Linux setups report the home folder, so prefer ~/Downloads there. */
export function defaultDownloadsPath(): string {
  const downloads = app.getPath("downloads");
  const home = app.getPath("home");
  const homeDownloads = join(home, "Downloads");

  return isSamePath(downloads, home) && isDirectory(homeDownloads) ? homeDownloads : downloads;
}
