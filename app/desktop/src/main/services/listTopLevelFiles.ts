import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { isIgnoredFile } from "./isIgnoredFile";

/** Lists the files directly inside a folder that SortDock may sort. */
export async function listTopLevelFiles(folderPath: string): Promise<string[]> {
  try {
    const entries = await readdir(folderPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && !isIgnoredFile(entry.name))
      .map((entry) => join(folderPath, entry.name));
  } catch {
    return [];
  }
}
