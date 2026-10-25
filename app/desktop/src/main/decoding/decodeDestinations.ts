import type { DestinationFolder } from "../../shared/models/DestinationFolder";
import { isRecord } from "./isRecord";
import { readOptionalString } from "./readOptionalString";

export function decodeDestinations(value: unknown): DestinationFolder[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): DestinationFolder[] => {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.name !== "string" || !item.name.trim()) {
      return [];
    }

    return [{ id: item.id, name: item.name, folderPath: readOptionalString(item.folderPath) }];
  });
}
