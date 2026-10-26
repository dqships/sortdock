import { randomUUID } from "node:crypto";

import type { DestinationFolder } from "../../shared/models/DestinationFolder";
import type { RoutingRule } from "../../shared/models/RoutingRule";
import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";
import { createDefaultSettings } from "./createDefaultSettings";

const starterRoutes: readonly { folder: string; extensions: string[] | null }[] = [
  { folder: "PDFs", extensions: ["pdf"] },
  { folder: "Images", extensions: ["png", "jpg", "jpeg", "heic", "gif", "webp"] },
  { folder: "Videos", extensions: ["mp4", "mov", "m4v"] },
  { folder: "Audio", extensions: ["mp3", "wav", "aiff", "m4a"] },
  { folder: "Archives", extensions: ["zip", "rar", "7z", "tar", "gz"] },
  { folder: "Documents", extensions: ["doc", "docx", "txt", "rtf", "md", "pages"] },
  { folder: "Data", extensions: ["csv", "json", "xls", "xlsx"] },
  { folder: "Apps", extensions: ["dmg", "pkg", "exe", "msi"] },
  { folder: "Projects", extensions: null },
];

export function createDefaultConfiguration(
  watchedFolderPath: string,
  createId: () => string = randomUUID,
): SortDockConfiguration {
  const destinations: DestinationFolder[] = [];
  const rules: RoutingRule[] = [];

  for (const route of starterRoutes) {
    const destination: DestinationFolder = { id: createId(), name: route.folder, folderPath: null };
    destinations.push(destination);

    if (route.extensions) {
      rules.push({ id: createId(), extensions: route.extensions, destinationId: destination.id });
    }
  }

  return {
    settings: createDefaultSettings(watchedFolderPath),
    destinations,
    rules,
    keywordRules: [],
    activities: [],
  };
}
