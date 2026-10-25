import { describe, expect, it, vi } from "vitest";

import type { SortDockSnapshot } from "../../shared/models/SortDockSnapshot";
import { createDefaultSettings } from "../decoding/createDefaultSettings";
import { buildTrayMenuTemplate } from "./buildTrayMenuTemplate";
import type { TrayMenuHandlers } from "./TrayMenuHandlers";

function snapshot(overrides: Partial<SortDockSnapshot> = {}): SortDockSnapshot {
  return {
    platform: "windows",
    settings: createDefaultSettings("C:\\Users\\me\\Downloads"),
    destinations: [],
    rules: [],
    keywordRules: [],
    activities: [],
    prompts: [],
    statusMessage: "Ready",
    statusTitle: "Sorting active",
    statusTone: "active",
    watchedFolderName: "Downloads",
    isHistoryPresented: false,
    availableUpdate: null,
    ...overrides,
  };
}

function handlers(): TrayMenuHandlers {
  return {
    openApp: vi.fn(),
    openHistory: vi.fn(),
    toggleSorting: vi.fn(),
    runSetupAgain: vi.fn(),
    resolvePrompt: vi.fn(),
    openUpdate: vi.fn(),
    quit: vi.fn(),
  };
}

describe("buildTrayMenuTemplate", () => {
  it("shows status and the basic controls", () => {
    const labels = buildTrayMenuTemplate(snapshot(), handlers()).map((item) => item.label);

    expect(labels).toEqual([
      "Sorting active",
      "Downloads: No files moved yet.",
      undefined,
      "Open SortDock",
      "History",
      "Pause Sorting",
      "Run Setup Again",
      undefined,
      "Quit SortDock",
    ]);
  });

  it("lets people answer the next waiting file from the tray", () => {
    const menuHandlers = handlers();
    const template = buildTrayMenuTemplate(
      snapshot({
        prompts: [
          {
            id: "p1",
            sourcePath: "C:\\Users\\me\\Downloads\\a.pdf",
            fileName: "a.pdf",
            watchedFolderName: "Downloads",
            destinationId: "d1",
            destinationName: "PDFs",
            activityId: "a1",
          },
        ],
      }),
      menuHandlers,
    );

    expect(template.map((item) => item.label)).toContain("a.pdf → PDFs");
    template.find((item) => item.label === "Ask Later")?.click?.({} as never, undefined, {} as never);
    expect(menuHandlers.resolvePrompt).toHaveBeenCalledWith("askLater");
  });

  it("puts an available update first", () => {
    const template = buildTrayMenuTemplate(
      snapshot({ availableUpdate: { version: "1.2.0", downloadUrl: "https://sortdock.vercel.app/download/windows" } }),
      handlers(),
    );

    expect(template[0]?.label).toBe("Update to version 1.2.0");
  });
});
