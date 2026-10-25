import type { KeywordRule } from "../../shared/models/KeywordRule";
import { isRecord } from "./isRecord";
import { readStringList } from "./readStringList";

export function decodeKeywordRules(value: unknown, destinationIds: ReadonlySet<string>): KeywordRule[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): KeywordRule[] => {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.destinationId !== "string") {
      return [];
    }

    const keywords = readStringList(item.keywords);

    if (keywords.length === 0 || !destinationIds.has(item.destinationId)) {
      return [];
    }

    return [
      {
        id: item.id,
        keywords,
        destinationId: item.destinationId,
        isEnabled: item.isEnabled !== false,
      },
    ];
  });
}
