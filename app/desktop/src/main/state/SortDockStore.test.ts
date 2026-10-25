import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";
import { createDefaultConfiguration } from "../decoding/createDefaultConfiguration";
import { SortDockStore } from "./SortDockStore";

async function waitFor(condition: () => boolean | Promise<boolean>, timeout = 5_000): Promise<void> {
  const started = Date.now();

  while (!(await condition())) {
    if (Date.now() - started > timeout) {
      throw new Error("Timed out waiting for condition");
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

describe("SortDockStore", () => {
  let root: string;
  let watched: string;
  let saved: SortDockConfiguration | null;
  let store: SortDockStore | null;

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "sortdock-store-"));
    watched = join(root, "Downloads");
    await mkdir(watched);
    saved = null;
    store = null;
  });

  afterEach(async () => {
    store?.stop();
    await rm(root, { recursive: true, force: true });
  });

  async function startStore(change: (configuration: SortDockConfiguration) => void = () => undefined) {
    const configuration = createDefaultConfiguration(watched);
    Object.assign(configuration.settings, {
      hasChosenWatchedFolder: true,
      onboardingVersion: 1,
      customDelaySeconds: 1,
      delayOption: "custom",
    });
    change(configuration);

    const pickFolder = vi.fn<(options: { title: string; buttonLabel: string }) => Promise<string | null>>();
    const onPromptQueued = vi.fn();
    const created = new SortDockStore({
      platform: "linux",
      defaultWatchedFolderPath: watched,
      persistence: {
        load: () => configuration,
        save: (next) => {
          saved = structuredClone(next);
        },
      },
      pickFolder,
      setRunAtLogin: vi.fn(),
      applyAppearance: vi.fn(),
      revealFile: vi.fn(),
      openExternal: vi.fn(),
      onPromptQueued,
    });
    store = created;
    await created.start();
    return { store: created, pickFolder, onPromptQueued };
  }

  it("moves a new file into its folder automatically", async () => {
    const { store } = await startStore((configuration) => {
      configuration.settings.moveBehavior = "autoMove";
    });

    await writeFile(join(watched, "report.pdf"), "pdf");

    await waitFor(async () => (await readdir(watched)).includes("PDFs"));
    await store.idle();

    expect(await readFile(join(watched, "PDFs", "report.pdf"), "utf8")).toBe("pdf");
    const activity = store.snapshot().activities[0];
    expect(activity).toMatchObject({ status: "moved", fileName: "report.pdf", destinationName: "PDFs" });
    expect(saved?.activities[0]?.status).toBe("moved");
  });

  it("never replaces a file that is already in the destination", async () => {
    await mkdir(join(watched, "PDFs"));
    await writeFile(join(watched, "PDFs", "report.pdf"), "original");
    const { store } = await startStore((configuration) => {
      configuration.settings.moveBehavior = "autoMove";
    });

    await writeFile(join(watched, "report.pdf"), "new");

    await waitFor(async () => (await readdir(join(watched, "PDFs"))).length === 2);
    await store.idle();

    expect(await readFile(join(watched, "PDFs", "report.pdf"), "utf8")).toBe("original");
    expect(await readFile(join(watched, "PDFs", "report (1).pdf"), "utf8")).toBe("new");
  });

  it("asks first, then moves when the person chooses Move", async () => {
    const { store, onPromptQueued } = await startStore();

    await writeFile(join(watched, "photo.png"), "png");
    await waitFor(() => store.snapshot().prompts.length === 1);

    expect(onPromptQueued).toHaveBeenCalledOnce();
    expect(store.snapshot().prompts[0]).toMatchObject({ fileName: "photo.png", destinationName: "Images" });
    expect(store.snapshot().activities[0]?.status).toBe("waiting");

    await store.resolveActivePrompt("move");

    expect(await readFile(join(watched, "Images", "photo.png"), "utf8")).toBe("png");
    expect(store.snapshot().prompts).toHaveLength(0);
    expect(store.snapshot().activities[0]?.status).toBe("moved");
  });

  it("leaves the file in place when the person chooses Leave", async () => {
    const { store } = await startStore();

    await writeFile(join(watched, "notes.txt"), "text");
    await waitFor(() => store.snapshot().prompts.length === 1);
    await store.resolveActivePrompt("leave");

    expect(await readFile(join(watched, "notes.txt"), "utf8")).toBe("text");
    expect(store.snapshot().activities[0]).toMatchObject({ status: "left", fileName: "notes.txt" });
  });

  it("snoozes a file when the person chooses Ask Later", async () => {
    const { store } = await startStore();

    await writeFile(join(watched, "song.mp3"), "audio");
    await waitFor(() => store.snapshot().prompts.length === 1);
    await store.resolveActivePrompt("askLater");

    const activity = store.snapshot().activities[0];
    expect(activity?.status).toBe("waiting");
    expect(activity?.snoozedUntil).toBeGreaterThan(Date.now() + 9 * 60 * 1_000);
  });

  it("moves to a folder chosen from the prompt, but never into the watched folder", async () => {
    const chosen = join(root, "Elsewhere");
    await mkdir(chosen);
    const { store, pickFolder } = await startStore();

    await writeFile(join(watched, "a.zip"), "zip");
    await writeFile(join(watched, "b.zip"), "zip");
    await waitFor(() => store.snapshot().prompts.length === 2);

    pickFolder.mockResolvedValueOnce(watched);
    await store.resolveActivePrompt("chooseFolder");
    expect(store.snapshot().statusMessage).toBe("Choose a folder outside the folder SortDock watches.");
    expect(store.snapshot().activities.find((activity) => activity.fileName === "a.zip")?.status).toBe("waiting");

    pickFolder.mockResolvedValueOnce(chosen);
    await store.resolveActivePrompt("chooseFolder");
    expect(await readdir(chosen)).toEqual(["b.zip"]);
  });

  it("checks keyword rules before file types", async () => {
    const { store } = await startStore((configuration) => {
      configuration.settings.moveBehavior = "autoMove";
      const documents = configuration.destinations.find((destination) => destination.name === "Documents")!;
      configuration.keywordRules.push({ id: "k1", keywords: ["invoice"], destinationId: documents.id, isEnabled: true });
    });

    await writeFile(join(watched, "Invoice-August.pdf"), "pdf");

    await waitFor(async () => (await readdir(watched)).includes("Documents"));
    await store.idle();

    expect(await readdir(join(watched, "Documents"))).toEqual(["Invoice-August.pdf"]);
  });

  it("ignores unfinished downloads and files that were there before sorting started", async () => {
    await writeFile(join(watched, "old.pdf"), "pdf");
    const { store } = await startStore((configuration) => {
      configuration.settings.moveBehavior = "autoMove";
    });

    await writeFile(join(watched, "movie.mp4.crdownload"), "partial");
    await writeFile(join(watched, "trigger.pdf"), "pdf");
    await waitFor(async () => (await readdir(watched)).includes("PDFs"));
    await store.idle();

    expect((await readdir(watched)).sort()).toEqual(["PDFs", "movie.mp4.crdownload", "old.pdf"]);
  });

  it("does nothing while paused", async () => {
    const { store } = await startStore((configuration) => {
      configuration.settings.moveBehavior = "autoMove";
    });

    store.toggleSorting();
    await writeFile(join(watched, "report.pdf"), "pdf");
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    await store.idle();

    expect(await readdir(watched)).toEqual(["report.pdf"]);
    expect(store.snapshot().statusTitle).toBe("Paused");
  });

  it("validates rules and settings sent from the window", async () => {
    const { store } = await startStore();
    const pdfs = store.snapshot().destinations.find((destination) => destination.name === "PDFs")!;
    const ruleCount = store.snapshot().rules.length;

    store.saveRule(null, ".pdf", pdfs.id);
    store.saveRule(null, "*** ", pdfs.id);
    store.saveRule(null, ".epub, .MOBI", "missing-destination");
    expect(store.snapshot().rules).toHaveLength(ruleCount);

    store.saveRule(null, ".epub, .MOBI", pdfs.id);
    expect(store.snapshot().rules.at(-1)?.extensions).toEqual(["epub", "mobi"]);

    store.updateSettings({ customDelaySeconds: 9_999, defaultDestinationId: "missing" } as never);
    expect(store.snapshot().settings.customDelaySeconds).toBe(300);
    expect(store.snapshot().settings.defaultDestinationId).toBeNull();
  });

  it("removes a destination along with its rules", async () => {
    const { store } = await startStore();
    const images = store.snapshot().destinations.find((destination) => destination.name === "Images")!;
    store.updateSettings({ defaultDestinationId: images.id });

    store.removeDestination(images.id);

    const snapshot = store.snapshot();
    expect(snapshot.destinations.some((destination) => destination.id === images.id)).toBe(false);
    expect(snapshot.rules.some((rule) => rule.destinationId === images.id)).toBe(false);
    expect(snapshot.settings.defaultDestinationId).toBeNull();
  });
});
