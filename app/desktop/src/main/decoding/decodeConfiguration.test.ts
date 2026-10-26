import { describe, expect, it } from "vitest";

import { createDefaultConfiguration } from "./createDefaultConfiguration";
import { decodeConfiguration } from "./decodeConfiguration";

describe("decodeConfiguration", () => {
  it("starts fresh when the saved file is unreadable", () => {
    const configuration = decodeConfiguration("not an object", "/home/me/Downloads");

    expect(configuration.settings.watchedFolderPath).toBe("/home/me/Downloads");
    expect(configuration.destinations.map((destination) => destination.name)).toContain("PDFs");
    expect(configuration.settings.onboardingVersion).toBe(0);
  });

  it("round-trips a saved configuration", () => {
    const original = createDefaultConfiguration("/Users/me/Downloads");
    original.settings.onboardingVersion = 1;
    original.settings.hasChosenWatchedFolder = true;

    expect(decodeConfiguration(JSON.parse(JSON.stringify(original)), "/elsewhere")).toEqual(original);
  });

  it("drops damaged entries and rules that point at missing folders", () => {
    const configuration = decodeConfiguration(
      {
        settings: { moveBehavior: "sometimes", customDelaySeconds: -4, defaultDestinationId: "gone", onboardingStep: 99 },
        destinations: [{ id: "d1", name: "PDFs", folderPath: null }, { id: 4 }],
        rules: [
          { id: "r1", extensions: ["pdf"], destinationId: "d1" },
          { id: "r2", extensions: ["png"], destinationId: "gone" },
        ],
        keywordRules: [{ id: "k1", keywords: [], destinationId: "d1" }],
        activities: [{ id: "a1", message: "Moved a.pdf to PDFs.", date: 1, status: "moved" }, { id: "a2" }],
      },
      "/downloads",
    );

    expect(configuration.settings).toMatchObject({
      moveBehavior: "askFirst",
      customDelaySeconds: 1,
      defaultDestinationId: null,
      onboardingStep: 6,
    });
    expect(configuration.destinations).toEqual([{ id: "d1", name: "PDFs", folderPath: null }]);
    expect(configuration.rules.map((rule) => rule.id)).toEqual(["r1"]);
    expect(configuration.keywordRules).toEqual([]);
    expect(configuration.activities.map((activity) => activity.id)).toEqual(["a1"]);
  });
});
