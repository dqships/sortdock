import { normalizeFileType } from "./normalizeFileType";

export function normalizeFileTypeList(text: string): string[] {
  const values = text
    .split(/[,\s]+/)
    .map(normalizeFileType)
    .filter((value): value is string => value !== null);

  return [...new Set(values)];
}
