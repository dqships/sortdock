import { describe, expect, it } from "vitest";

import { isNewerVersion } from "./isNewerVersion";

describe("isNewerVersion", () => {
  it("compares versions number by number", () => {
    expect(isNewerVersion("v1.10.0", "1.9.3")).toBe(true);
    expect(isNewerVersion("1.0.1", "1.0.0")).toBe(true);
    expect(isNewerVersion("2", "1.9.9")).toBe(true);
  });

  it("does not report the same or an older version", () => {
    expect(isNewerVersion("v1.0.0", "1.0.0")).toBe(false);
    expect(isNewerVersion("1.0", "1.0.0")).toBe(false);
    expect(isNewerVersion("0.9.9", "1.0.0")).toBe(false);
  });
});
