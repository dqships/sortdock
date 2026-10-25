import { splitFileName } from "../../shared/rules/splitFileName";

/** Index 0 keeps the name. Later indexes give "example (1).pdf", "example (2).pdf", and so on. */
export function conflictSafeFileName(fileName: string, index: number): string {
  if (index === 0) {
    return fileName;
  }

  const { baseName, extension } = splitFileName(fileName);
  return extension ? `${baseName} (${index}).${extension}` : `${baseName} (${index})`;
}
