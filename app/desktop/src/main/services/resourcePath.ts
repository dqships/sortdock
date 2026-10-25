import { app } from "electron";
import { join } from "node:path";

/** Files in app/desktop/resources, both in development and inside the installed app. */
export function resourcePath(fileName: string): string {
  return join(app.getAppPath(), "resources", fileName);
}
