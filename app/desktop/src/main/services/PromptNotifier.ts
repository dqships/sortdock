import { Notification } from "electron";

import type { PendingMovePrompt } from "../../shared/models/PendingMovePrompt";

/** Lets people know a file is waiting when the SortDock window is not in front. */
export class PromptNotifier {
  constructor(
    private readonly isWindowFocused: () => boolean,
    private readonly onClick: () => void,
  ) {}

  notify(prompt: PendingMovePrompt, waitingCount: number): void {
    if (this.isWindowFocused() || !Notification.isSupported()) {
      return;
    }

    const notification = new Notification({
      title: `Move "${prompt.fileName}" to ${prompt.destinationName}?`,
      body: waitingCount > 1 ? `${waitingCount} files are waiting in SortDock.` : "Open SortDock to choose.",
    });
    notification.on("click", this.onClick);
    notification.show();
  }
}
