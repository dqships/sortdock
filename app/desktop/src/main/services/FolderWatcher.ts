import { watch, type FSWatcher } from "node:fs";

export class FolderWatcher {
  private watcher: FSWatcher | null = null;

  constructor(
    private readonly folderPath: string,
    private readonly onChange: () => void,
    private readonly onStop: () => void,
  ) {}

  start(): boolean {
    this.stop();

    try {
      this.watcher = watch(this.folderPath, { persistent: true }, () => this.onChange());
      this.watcher.on("error", () => {
        this.stop();
        this.onStop();
      });
      return true;
    } catch {
      this.watcher = null;
      return false;
    }
  }

  stop(): void {
    this.watcher?.close();
    this.watcher = null;
  }
}
