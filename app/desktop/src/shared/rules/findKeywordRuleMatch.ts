import type { KeywordRule } from "../models/KeywordRule";
import { splitFileName } from "./splitFileName";

export function findKeywordRuleMatch(fileName: string, rules: readonly KeywordRule[]): KeywordRule | null {
  const baseName = splitFileName(fileName).baseName.toLowerCase();

  return (
    rules.find(
      (rule) =>
        rule.isEnabled &&
        rule.keywords.some((keyword) => keyword.length > 0 && baseName.includes(keyword.toLowerCase())),
    ) ?? null
  );
}
