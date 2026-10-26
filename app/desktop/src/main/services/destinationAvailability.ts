import { accessSync, constants, statSync } from "node:fs";

import type { DestinationAvailability } from "../../shared/models/DestinationAvailability";
import type { DestinationFolder } from "../../shared/models/DestinationFolder";

/** Folders inside the watched folder are created when needed, so only picked folders are checked. */
export function destinationAvailability(destination: DestinationFolder): DestinationAvailability {
  if (destination.folderPath === null) {
    return "available";
  }

  try {
    if (!statSync(destination.folderPath).isDirectory()) {
      return "needsAccess";
    }
  } catch {
    return "missing";
  }

  try {
    accessSync(destination.folderPath, constants.W_OK);
    return "available";
  } catch {
    return "needsAccess";
  }
}
