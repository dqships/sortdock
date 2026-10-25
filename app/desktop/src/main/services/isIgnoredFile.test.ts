import { describe, expect, it } from "vitest";

import { isIgnoredFile } from "./isIgnoredFile";

describe("isIgnoredFile", () => {
  it.each([".DS_Store", "movie.mp4.crdownload", "setup.exe.part", "file.partial", "Unconfirmed 1.tmp", "photo.download", "desktop.ini", "Thumbs.db", "~$report.docx"])(
    "ignores %s",
    (fileName) => {
      expect(isIgnoredFile(fileName)).toBe(true);
    },
  );

  it.each(["report.pdf", "README", "archive.tar.gz"])("keeps %s", (fileName) => {
    expect(isIgnoredFile(fileName)).toBe(false);
  });
});
