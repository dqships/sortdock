import { describe, expect, it } from "vitest";

import { prefersMarkdown } from "./prefersMarkdown";

describe("prefersMarkdown", () => {
  it("is false for browsers and missing headers", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(
      false,
    );
  });

  it("is true when Markdown ranks above HTML", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/markdown, text/html;q=0.5")).toBe(true);
  });

  it("is false when HTML ranks equal or higher", () => {
    expect(prefersMarkdown("text/html, text/markdown")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0.5, text/html")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0")).toBe(false);
  });
});
