function versionParts(version: string): number[] {
  return version
    .replace(/^[^\d]*/, "")
    .split(/[.-]/)
    .map((part) => Number.parseInt(part, 10))
    .map((part) => (Number.isFinite(part) ? part : 0));
}

export function isNewerVersion(availableVersion: string, installedVersion: string): boolean {
  const available = versionParts(availableVersion);
  const installed = versionParts(installedVersion);
  const length = Math.max(available.length, installed.length, 3);

  for (let index = 0; index < length; index += 1) {
    const difference = (available[index] ?? 0) - (installed[index] ?? 0);

    if (difference !== 0) {
      return difference > 0;
    }
  }

  return false;
}
