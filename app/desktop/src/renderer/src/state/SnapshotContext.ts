import { createContext } from "react";

import type { SortDockSnapshot } from "../../../shared/models/SortDockSnapshot";

export const SnapshotContext = createContext<SortDockSnapshot | null>(null);
