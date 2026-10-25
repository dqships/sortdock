import { join } from "node:path";

import type { DestinationFolder } from "../../shared/models/DestinationFolder";

export function destinationFolderPath(destination: DestinationFolder, watchedFolderPath: string): string {
  return destination.folderPath ?? join(watchedFolderPath, destination.name);
}
