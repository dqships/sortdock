/** "4m 12s remaining", "1h 5m remaining", or "Ready now". */
export function snoozeRemainingText(snoozedUntil: number | null, now: number): string {
  const remainingSeconds = snoozedUntil === null ? 0 : Math.ceil((snoozedUntil - now) / 1_000);

  if (remainingSeconds <= 0) {
    return "Ready now";
  }

  const hours = Math.floor(remainingSeconds / 3_600);
  const minutes = Math.floor((remainingSeconds % 3_600) / 60);
  const seconds = remainingSeconds % 60;
  const text = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`;
  return `${text} remaining`;
}
