import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { moveFileSafely } from "./moveFileSafely";

describe("moveFileSafely", () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "sortdock-move-"));
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("creates the destination folder and moves the file", async () => {
    await writeFile(join(root, "a.pdf"), "a");

    const moved = await moveFileSafely(join(root, "a.pdf"), join(root, "PDFs"));

    expect(moved).toBe(join(root, "PDFs", "a.pdf"));
    expect(await readFile(moved, "utf8")).toBe("a");
    expect(await readdir(root)).toEqual(["PDFs"]);
  });

  it("numbers the name instead of replacing existing files", async () => {
    const folder = join(root, "PDFs");
    await moveFileSafely(await writeAndReturn(join(root, "a.pdf"), "first"), folder);
    await moveFileSafely(await writeAndReturn(join(root, "a.pdf"), "second"), folder);
    await moveFileSafely(await writeAndReturn(join(root, "a.pdf"), "third"), folder);

    expect((await readdir(folder)).sort()).toEqual(["a (1).pdf", "a (2).pdf", "a.pdf"]);
    expect(await readFile(join(folder, "a.pdf"), "utf8")).toBe("first");
    expect(await readFile(join(folder, "a (2).pdf"), "utf8")).toBe("third");
  });

  it("leaves no placeholder behind when the move fails", async () => {
    await expect(moveFileSafely(join(root, "missing.pdf"), join(root, "PDFs"))).rejects.toThrow();
    expect(await readdir(join(root, "PDFs"))).toEqual([]);
  });
});

async function writeAndReturn(path: string, content: string): Promise<string> {
  await writeFile(path, content);
  return path;
}
