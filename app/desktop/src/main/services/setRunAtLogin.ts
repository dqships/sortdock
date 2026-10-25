import { app } from "electron";

import { appIdentity } from "./appIdentity";

export function setRunAtLogin(isEnabled: boolean): void {
  // Development builds would register the bare Electron binary, so only installed apps change this.
  if (!app.isPackaged || (process.platform !== "darwin" && process.platform !== "win32")) {
    return;
  }

  app.setLoginItemSettings({ openAtLogin: isEnabled, args: [appIdentity.hiddenLaunchArgument] });
}
