import { splitFileName } from "../../shared/rules/splitFileName";

const temporaryExtensions = new Set([
  "crdownload",
  "download",
  "filepart",
  "opdownload",
  "part",
  "partial",
  "tmp",
]);

const systemFileNames = new Set(["desktop.ini", "thumbs.db"]);

/** Skips hidden files, unfinished downloads, and system files nobody wants sorted. */
export function isIgnoredFile(fileName: string): boolean {
  const lowercased = fileName.toLowerCase();

  if (lowercased.startsWith(".") || lowercased.startsWith("~$")) {
    return true;
  }

  if (systemFileNames.has(lowercased)) {
    return true;
  }

  return temporaryExtensions.has(splitFileName(lowercased).extension);
}
