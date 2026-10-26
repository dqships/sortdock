import { Menu, nativeImage, Tray } from "electron";

import type { SortDockSnapshot } from "../../shared/models/SortDockSnapshot";
import { resourcePath } from "../services/resourcePath";
import { buildTrayMenuTemplate } from "./buildTrayMenuTemplate";
import type { TrayMenuHandlers } from "./TrayMenuHandlers";

function trayIconFileName(): string {
  switch (process.platform) {
    case "darwin":
      return "trayTemplate.png";
    case "win32":
      return "tray.ico";
    default:
      return "tray.png";
  }
}

export class TrayController {
  private tray: Tray | null = null;

  constructor(private readonly handlers: TrayMenuHandlers) {}

  start(snapshot: SortDockSnapshot): void {
    const icon = nativeImage.createFromPath(resourcePath(trayIconFileName()));

    if (process.platform === "darwin") {
      icon.setTemplateImage(true);
    }

    this.tray = new Tray(icon);

    if (process.platform === "win32") {
      // Windows convention: left click opens the app, right click shows the menu.
      this.tray.on("click", this.handlers.openApp);
    }

    this.update(snapshot);
  }

  update(snapshot: SortDockSnapshot): void {
    if (!this.tray) {
      return;
    }

    const waitingCount = snapshot.prompts.length;
    this.tray.setToolTip(waitingCount > 0 ? `SortDock: ${waitingCount} waiting` : `SortDock: ${snapshot.statusTitle}`);

    if (process.platform === "darwin") {
      this.tray.setTitle(waitingCount > 0 ? String(waitingCount) : "");
    }

    this.tray.setContextMenu(Menu.buildFromTemplate(buildTrayMenuTemplate(snapshot, this.handlers)));
  }
}
