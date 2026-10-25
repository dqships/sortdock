import { useContext } from "react";

import type { SortDockSnapshot } from "../../../shared/models/SortDockSnapshot";
import { SnapshotContext } from "./SnapshotContext";

export function useSnapshot(): SortDockSnapshot {
  const snapshot = useContext(SnapshotContext);

  if (!snapshot) {
    throw new Error("useSnapshot must be used inside SnapshotContext");
  }

  return snapshot;
}
