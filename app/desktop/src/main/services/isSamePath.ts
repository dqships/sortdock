import { resolve } from "node:path";

export function isSamePath(first: string, second: string): boolean {
  const normalize = (path: string) => {
    const resolved = resolve(path);
    return process.platform === "linux" ? resolved : resolved.toLowerCase();
  };

  return normalize(first) === normalize(second);
}
