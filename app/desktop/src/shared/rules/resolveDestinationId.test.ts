import { describe, expect, it } from "vitest";

import { resolveDestinationId } from "./resolveDestinationId";

const fileTypeRules = [
  { id: "r1", extensions: ["pdf"], destinationId: "pdfs" },
  { id: "r2", extensions: ["png", "jpg"], destinationId: "images" },
];

const keywordRules = [
  { id: "k1", keywords: ["invoice"], destinationId: "finance", isEnabled: true },
  { id: "k2", keywords: ["tax"], destinationId: "taxes", isEnabled: false },
];

describe("resolveDestinationId", () => {
  it("prefers the first matching keyword rule, ignoring case", () => {
    expect(resolveDestinationId("INVOICE-may.pdf", keywordRules, fileTypeRules, null)).toBe("finance");
  });

  it("skips keyword rules that are turned off", () => {
    expect(resolveDestinationId("tax-2026.pdf", keywordRules, fileTypeRules, null)).toBe("pdfs");
  });

  it("matches keywords against the name without its ending", () => {
    expect(resolveDestinationId("photo.invoice", keywordRules, fileTypeRules, "fallback")).toBe("fallback");
  });

  it("falls back to file types and then the default folder", () => {
    expect(resolveDestinationId("Photo.JPG", keywordRules, fileTypeRules, null)).toBe("images");
    expect(resolveDestinationId("song.mp3", keywordRules, fileTypeRules, "other")).toBe("other");
    expect(resolveDestinationId("README", keywordRules, fileTypeRules, null)).toBeNull();
  });
});
