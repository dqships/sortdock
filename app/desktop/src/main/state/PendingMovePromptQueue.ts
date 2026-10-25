import type { PendingMovePrompt } from "../../shared/models/PendingMovePrompt";

export class PendingMovePromptQueue {
  private prompts: PendingMovePrompt[] = [];

  get all(): readonly PendingMovePrompt[] {
    return this.prompts;
  }

  get current(): PendingMovePrompt | null {
    return this.prompts[0] ?? null;
  }

  /** Returns false when the same file is already waiting. */
  enqueue(prompt: PendingMovePrompt): boolean {
    if (this.prompts.some((existing) => existing.sourcePath === prompt.sourcePath)) {
      return false;
    }

    this.prompts.push(prompt);
    return true;
  }

  /** Takes the first prompt off the queue so a double click cannot answer it twice. */
  resolveCurrent(): PendingMovePrompt | null {
    return this.prompts.shift() ?? null;
  }

  removeActivity(activityId: string): void {
    this.prompts = this.prompts.filter((prompt) => prompt.activityId !== activityId);
  }

  discardAll(): void {
    this.prompts = [];
  }
}
