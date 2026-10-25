import { cp, mkdir, open, rename, rm, unlink } from "node:fs/promises";
import { basename, join } from "node:path";

import { conflictSafeFileName } from "./conflictSafeFileName";

const maxNameAttempts = 10_000;

function hasCode(error: unknown, code: string): boolean {
  return error instanceof Error && "code" in error && error.code === code;
}

async function moveOnto(sourcePath: string, targetPath: string): Promise<void> {
  try {
    await rename(sourcePath, targetPath);
  } catch (error) {
    if (!hasCode(error, "EXDEV")) {
      throw error;
    }

    await cp(sourcePath, targetPath, { force: true, preserveTimestamps: true });
    await unlink(sourcePath);
  }
}

/**
 * Moves a file into a folder without ever replacing an existing file.
 * The target name is reserved first with an exclusive create, so only that
 * empty placeholder can be replaced by the move.
 */
export async function moveFileSafely(sourcePath: string, destinationFolderPath: string): Promise<string> {
  await mkdir(destinationFolderPath, { recursive: true });
  const fileName = basename(sourcePath);

  for (let index = 0; index < maxNameAttempts; index += 1) {
    const targetPath = join(destinationFolderPath, conflictSafeFileName(fileName, index));

    try {
      const placeholder = await open(targetPath, "wx");
      await placeholder.close();
    } catch (error) {
      if (hasCode(error, "EEXIST")) {
        continue;
      }

      throw error;
    }

    try {
      await moveOnto(sourcePath, targetPath);
      return targetPath;
    } catch (error) {
      await rm(targetPath, { force: true });
      throw error;
    }
  }

  throw new Error(`No free name for ${fileName}`);
}
