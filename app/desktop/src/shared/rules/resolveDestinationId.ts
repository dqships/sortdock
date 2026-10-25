import type { KeywordRule } from "../models/KeywordRule";
import type { RoutingRule } from "../models/RoutingRule";
import { findKeywordRuleMatch } from "./findKeywordRuleMatch";
import { splitFileName } from "./splitFileName";

/** Keyword rules win first, then file types, then the default folder. */
export function resolveDestinationId(
  fileName: string,
  keywordRules: readonly KeywordRule[],
  fileTypeRules: readonly RoutingRule[],
  defaultDestinationId: string | null,
): string | null {
  const keywordRule = findKeywordRuleMatch(fileName, keywordRules);

  if (keywordRule) {
    return keywordRule.destinationId;
  }

  const extension = splitFileName(fileName).extension.toLowerCase();
  const fileTypeRule = fileTypeRules.find((rule) => rule.extensions.includes(extension));

  return fileTypeRule?.destinationId ?? defaultDestinationId;
}
