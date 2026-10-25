import { describe, expect, it } from "vitest";

import { normalizeFileTypeList } from "./normalizeFileTypeList";
import { normalizeKeywordList } from "./normalizeKeywordList";
import { splitFileName } from "./splitFileName";

describe("normalizeFileTypeList", () => {
  it("accepts dots, commas, spaces, and mixed case without duplicates", () => {
    expect(normalizeFileTypeList(".PDF, png  .jpg\n.png")).toEqual(["pdf", "png", "jpg"]);
  });

  it("drops values that are not file endings", () => {
    expect(normalizeFileTypeList("*.pdf, ., ../x, tar.gz")).toEqual([]);
  });
});

describe("normalizeKeywordList", () => {
  it("splits on commas and semicolons, trims, lowercases, and removes duplicates", () => {
    expect(normalizeKeywordList(" Invoice; receipt,INVOICE ,, tax return")).toEqual(["invoice", "receipt", "tax return"]);
  });
});

describe("splitFileName", () => {
  it("uses the last dot", () => {
    expect(splitFileName("archive.tar.gz")).toEqual({ baseName: "archive.tar", extension: "gz" });
  });

  it("treats names without a usable ending as having none", () => {
    expect(splitFileName("README")).toEqual({ baseName: "README", extension: "" });
    expect(splitFileName(".env")).toEqual({ baseName: ".env", extension: "" });
    expect(splitFileName("draft.")).toEqual({ baseName: "draft.", extension: "" });
  });
});
