import { describe, expect, it } from "vitest";

import { detectDesktopPlatform } from "./detectDesktopPlatform";
import { orderPlatforms } from "./orderPlatforms";

describe("detectDesktopPlatform", () => {
  it("recognizes Windows and Mac browsers", () => {
    expect(
      detectDesktopPlatform(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      ),
    ).toBe("windows");
    expect(
      detectDesktopPlatform(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15",
      ),
    ).toBe("mac");
    expect(detectDesktopPlatform("", "Windows")).toBe("windows");
  });

  it("does not guess for phones, tablets, or other systems", () => {
    expect(
      detectDesktopPlatform(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15",
      ),
    ).toBeNull();
    expect(detectDesktopPlatform("Mozilla/5.0 (X11; Linux x86_64)")).toBeNull();
  });
});

describe("orderPlatforms", () => {
  it("puts the visitor's computer first", () => {
    expect(orderPlatforms("windows")).toEqual(["windows", "mac"]);
    expect(orderPlatforms(null)).toEqual(["mac", "windows"]);
  });
});
