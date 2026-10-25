import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

import type { SortDockSnapshot } from "../shared/models/SortDockSnapshot";
import type { SortDockActions } from "../shared/ipc/SortDockActions";
import type { SortDockBridge } from "../shared/ipc/SortDockBridge";
import { ipcChannels } from "../shared/ipc/ipcChannels";
import { sortDockActionNames } from "../shared/ipc/sortDockActionNames";

const actions = Object.fromEntries(
  sortDockActionNames.map((name) => [name, (...args: unknown[]) => ipcRenderer.invoke(ipcChannels.action, name, args)]),
) as SortDockBridge["actions"] satisfies { [Name in keyof SortDockActions]: unknown };

const bridge: SortDockBridge = {
  getSnapshot: () => ipcRenderer.invoke(ipcChannels.getSnapshot) as Promise<SortDockSnapshot>,
  onSnapshot: (listener) => {
    const handler = (_event: IpcRendererEvent, snapshot: SortDockSnapshot) => listener(snapshot);
    ipcRenderer.on(ipcChannels.snapshot, handler);
    return () => ipcRenderer.removeListener(ipcChannels.snapshot, handler);
  },
  actions,
};

contextBridge.exposeInMainWorld("sortdock", bridge);
