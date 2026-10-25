import { app, dialog, type BrowserWindow, type OpenDialogOptions } from "electron";

export async function pickFolder(
  parentWindow: BrowserWindow | null,
  options: { title: string; buttonLabel: string },
): Promise<string | null> {
  const dialogOptions: OpenDialogOptions = {
    title: options.title,
    message: options.title,
    buttonLabel: options.buttonLabel,
    properties: ["openDirectory", "createDirectory"],
  };

  if (!parentWindow) {
    // A prompt answered from the menu bar has no window, so bring the picker to the front.
    app.focus({ steal: true });
  }

  const result = parentWindow
    ? await dialog.showOpenDialog(parentWindow, dialogOptions)
    : await dialog.showOpenDialog(dialogOptions);

  return result.canceled ? null : (result.filePaths[0] ?? null);
}
