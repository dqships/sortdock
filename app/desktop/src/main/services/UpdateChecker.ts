import type { AppUpdate } from "../../shared/models/AppUpdate";
import type { DesktopPlatform } from "../../shared/models/DesktopPlatform";
import { fetchAvailableUpdate } from "./fetchAvailableUpdate";

const minimumCheckInterval = 60 * 60 * 1_000;

export class UpdateChecker {
  private lastCheckedAt = 0;
  private isChecking = false;

  constructor(
    private readonly installedVersion: string,
    private readonly platform: DesktopPlatform,
    private readonly onUpdate: (update: AppUpdate | null) => void,
  ) {}

  /** Checks at most once an hour. A failed check never interrupts sorting or hides a known update. */
  async check(): Promise<void> {
    if (this.isChecking || Date.now() - this.lastCheckedAt < minimumCheckInterval) {
      return;
    }

    this.isChecking = true;
    this.lastCheckedAt = Date.now();

    try {
      this.onUpdate(await fetchAvailableUpdate(this.installedVersion, this.platform));
    } catch {
      // Offline or rate limited. Try again later.
    } finally {
      this.isChecking = false;
    }
  }
}
