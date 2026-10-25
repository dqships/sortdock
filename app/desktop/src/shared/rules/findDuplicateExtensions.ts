import type { RoutingRule } from "../models/RoutingRule";

export function findDuplicateExtensions(
  extensions: readonly string[],
  rules: readonly RoutingRule[],
  excludingRuleId: string | null,
): string[] {
  const otherExtensions = new Set(
    rules.filter((rule) => rule.id !== excludingRuleId).flatMap((rule) => rule.extensions),
  );

  return extensions.filter((extension) => otherExtensions.has(extension));
}
