import { useSyncExternalStore } from "react";

import type { SortDockSnapshot } from "../../../shared/models/SortDockSnapshot";
import { snapshotStore } from "./snapshotStore";

export function useSortDockSnapshot(): SortDockSnapshot | null {
  return useSyncExternalStore(snapshotStore.subscribe, snapshotStore.getSnapshot);
}
