export function normalizeKeywordList(text: string): string[] {
  const keywords = text
    .split(/[,;\n\t]/)
    .map((keyword) => keyword.trim().toLowerCase())
    .filter((keyword) => keyword.length > 0);

  return [...new Set(keywords)];
}
