import { ipcMain } from "electron";

import { ipcChannels } from "../../shared/ipc/ipcChannels";
import { sortDockActionNames, type SortDockActionName } from "../../shared/ipc/sortDockActionNames";
import type { SortDockStore } from "../state/SortDockStore";
import type { MainWindowController } from "../windows/MainWindowController";

function isActionName(value: unknown): value is SortDockActionName {
  return typeof value === "string" && (sortDockActionNames as readonly string[]).includes(value);
}

export function registerIpcHandlers(store: SortDockStore, windowController: MainWindowController): void {
  ipcMain.handle(ipcChannels.getSnapshot, (event) => {
    if (!windowController.ownsSender(event.sender)) {
      throw new Error("Unknown window");
    }

    return store.snapshot();
  });

  ipcMain.handle(ipcChannels.action, async (event, name: unknown, args: unknown) => {
    if (!windowController.ownsSender(event.sender) || !isActionName(name) || !Array.isArray(args)) {
      throw new Error("Unknown action");
    }

    const action = store[name] as (...actionArgs: unknown[]) => unknown;
    return await action.apply(store, args);
  });
}
