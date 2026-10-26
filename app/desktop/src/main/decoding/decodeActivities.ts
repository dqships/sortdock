import type { ActivityRecord } from "../../shared/models/ActivityRecord";
import { isRecord } from "./isRecord";
import { readOneOf } from "./readOneOf";
import { readOptionalString } from "./readOptionalString";

const statuses = ["moved", "left", "waiting", "failed", "note"] as const;

export function decodeActivities(value: unknown): ActivityRecord[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): ActivityRecord[] => {
    if (
      !isRecord(item) ||
      typeof item.id !== "string" ||
      typeof item.message !== "string" ||
      typeof item.date !== "number"
    ) {
      return [];
    }

    return [
      {
        id: item.id,
        message: item.message,
        date: item.date,
        status: readOneOf(item.status, statuses, "note"),
        fileName: readOptionalString(item.fileName),
        sourcePath: readOptionalString(item.sourcePath),
        currentPath: readOptionalString(item.currentPath),
        destinationId: readOptionalString(item.destinationId),
        destinationName: readOptionalString(item.destinationName),
        snoozedUntil: typeof item.snoozedUntil === "number" ? item.snoozedUntil : null,
      },
    ];
  });
}
