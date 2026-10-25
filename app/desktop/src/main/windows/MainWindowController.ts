import { app, BrowserWindow, nativeTheme } from "electron";
import { join } from "node:path";

import type { SortDockSnapshot } from "../../shared/models/SortDockSnapshot";
import { ipcChannels } from "../../shared/ipc/ipcChannels";

/**
 * Owns the single SortDock window. Closing it keeps SortDock running in the
 * menu bar or system tray; opening it again focuses the same window.
 */
export class MainWindowController {
  private window: BrowserWindow | null = null;

  constructor(private readonly onShow: () => void) {}

  get current(): BrowserWindow | null {
    return this.window && !this.window.isDestroyed() ? this.window : null;
  }

  isFocused(): boolean {
    return this.current?.isFocused() ?? false;
  }

  ownsSender(sender: Electron.WebContents): boolean {
    return this.current?.webContents === sender;
  }

  show(): void {
    if (process.platform === "darwin") {
      void app.dock?.show();
    }

    const existing = this.current;

    if (existing) {
      if (existing.isMinimized()) {
        existing.restore();
      }

      existing.show();
      existing.focus();
    } else {
      this.window = this.create();
    }

    this.onShow();
  }

  sendSnapshot(snapshot: SortDockSnapshot): void {
    this.current?.webContents.send(ipcChannels.snapshot, snapshot);
  }

  private create(): BrowserWindow {
    const window = new BrowserWindow({
      title: "SortDock",
      width: 720,
      height: 600,
      minWidth: 640,
      minHeight: 480,
      show: false,
      autoHideMenuBar: true,
      backgroundColor: nativeTheme.shouldUseDarkColors ? "#1c1f26" : "#f7faff",
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    window.once("ready-to-show", () => {
      window.show();
      window.focus();
    });

    window.on("closed", () => {
      this.window = null;

      if (process.platform === "darwin") {
        app.dock?.hide();
      }
    });

    // The window only ever shows SortDock's own screens.
    window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
    window.webContents.on("will-navigate", (event) => event.preventDefault());

    const rendererUrl = process.env.ELECTRON_RENDERER_URL;

    if (!app.isPackaged && rendererUrl) {
      void window.loadURL(rendererUrl);
    } else {
      void window.loadFile(join(__dirname, "../renderer/index.html"));
    }

    return window;
  }
}
