import type { SortDockSnapshot } from "../../../shared/models/SortDockSnapshot";

let current: SortDockSnapshot | null = null;
const listeners = new Set<() => void>();

function publish(snapshot: SortDockSnapshot): void {
  current = snapshot;
  listeners.forEach((listener) => listener());
}

void window.sortdock.getSnapshot().then((snapshot) => {
  // A pushed update may already be newer than the first answer.
  if (!current) {
    publish(snapshot);
  }
});
window.sortdock.onSnapshot(publish);

/** Keeps the latest state pushed from the background process. */
export const snapshotStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): SortDockSnapshot | null {
    return current;
  },
};
