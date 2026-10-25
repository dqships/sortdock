import { Menu } from "electron";

/** Mac needs the standard menus so copy, paste, and Quit work. Windows keeps the window clean. */
export function createApplicationMenu(): void {
  if (process.platform !== "darwin") {
    Menu.setApplicationMenu(null);
    return;
  }

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([{ role: "appMenu" }, { role: "editMenu" }, { role: "windowMenu" }]),
  );
}
