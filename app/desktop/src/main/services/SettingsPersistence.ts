import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";
import { createDefaultConfiguration } from "../decoding/createDefaultConfiguration";
import { decodeConfiguration } from "../decoding/decodeConfiguration";

export class SettingsPersistence {
  constructor(
    private readonly filePath: string,
    private readonly defaultWatchedFolderPath: string,
  ) {}

  load(): SortDockConfiguration {
    try {
      const raw: unknown = JSON.parse(readFileSync(this.filePath, "utf8"));
      return decodeConfiguration(raw, this.defaultWatchedFolderPath);
    } catch {
      return createDefaultConfiguration(this.defaultWatchedFolderPath);
    }
  }

  save(configuration: SortDockConfiguration): void {
    const temporaryPath = `${this.filePath}.tmp`;

    try {
      mkdirSync(dirname(this.filePath), { recursive: true });
      writeFileSync(temporaryPath, JSON.stringify(configuration, null, 2), "utf8");
      renameSync(temporaryPath, this.filePath);
    } catch (error) {
      console.error("Could not save SortDock settings", error);
    }
  }
}
