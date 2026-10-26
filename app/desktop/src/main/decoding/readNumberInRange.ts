export function readNumberInRange(value: unknown, range: { min: number; max: number }, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(Math.round(value), range.min), range.max);
}
