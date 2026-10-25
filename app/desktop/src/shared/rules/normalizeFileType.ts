const allowedFileType = /^[\p{L}\p{N}_-]+$/u;

export function normalizeFileType(value: string): string | null {
  const trimmed = value.trim();
  const withoutDot = trimmed.startsWith(".") ? trimmed.slice(1) : trimmed;
  const lowercased = withoutDot.toLowerCase();

  if (!lowercased || !allowedFileType.test(lowercased)) {
    return null;
  }

  return lowercased;
}
