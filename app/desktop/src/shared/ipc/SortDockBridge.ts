import type { SortDockSnapshot } from "../models/SortDockSnapshot";
import type { SortDockActions } from "./SortDockActions";

/** What the preload script exposes to the window as `window.sortdock`. */
export type SortDockBridge = {
  getSnapshot(): Promise<SortDockSnapshot>;
  onSnapshot(listener: (snapshot: SortDockSnapshot) => void): () => void;
  actions: { [Name in keyof SortDockActions]: (...args: Parameters<SortDockActions[Name]>) => Promise<Awaited<ReturnType<SortDockActions[Name]>>> };
};
