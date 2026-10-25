import type { RoutingRule } from "../../shared/models/RoutingRule";
import { isRecord } from "./isRecord";
import { readStringList } from "./readStringList";

export function decodeRoutingRules(value: unknown, destinationIds: ReadonlySet<string>): RoutingRule[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): RoutingRule[] => {
    if (!isRecord(item) || typeof item.id !== "string" || typeof item.destinationId !== "string") {
      return [];
    }

    const extensions = readStringList(item.extensions);

    if (extensions.length === 0 || !destinationIds.has(item.destinationId)) {
      return [];
    }

    return [{ id: item.id, extensions, destinationId: item.destinationId }];
  });
}
