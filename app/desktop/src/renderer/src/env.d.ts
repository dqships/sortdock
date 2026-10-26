import type { SortDockBridge } from "../../shared/ipc/SortDockBridge";

declare global {
  interface Window {
    sortdock: SortDockBridge;
  }
}
