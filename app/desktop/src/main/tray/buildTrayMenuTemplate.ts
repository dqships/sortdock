import type { MenuItemConstructorOptions } from "electron";

import type { SortDockSnapshot } from "../../shared/models/SortDockSnapshot";
import type { TrayMenuHandlers } from "./TrayMenuHandlers";

/** The menu bar (Mac) or system tray (Windows) menu: status, the next waiting file, and quick controls. */
export function buildTrayMenuTemplate(
  snapshot: SortDockSnapshot,
  handlers: TrayMenuHandlers,
): MenuItemConstructorOptions[] {
  const lastActivity = snapshot.activities[0]?.message ?? "No files moved yet.";
  const prompt = snapshot.prompts[0];
  const template: MenuItemConstructorOptions[] = [];

  if (snapshot.availableUpdate) {
    template.push(
      { label: `Update to version ${snapshot.availableUpdate.version}`, click: handlers.openUpdate },
      { type: "separator" },
    );
  }

  template.push(
    { label: snapshot.statusTitle, enabled: false },
    { label: `${snapshot.watchedFolderName}: ${lastActivity}`, enabled: false },
  );

  if (prompt) {
    template.push(
      { type: "separator" },
      { label: `${prompt.fileName} → ${prompt.destinationName}`, enabled: false },
      { label: `From ${prompt.watchedFolderName} · 1 of ${snapshot.prompts.length}`, enabled: false },
      { label: "Move", click: () => handlers.resolvePrompt("move") },
      { label: "Leave Here", click: () => handlers.resolvePrompt("leave") },
    );

    if (snapshot.settings.askLaterEnabled) {
      template.push({ label: "Ask Later", click: () => handlers.resolvePrompt("askLater") });
    }

    template.push({ label: "Choose Another Folder…", click: () => handlers.resolvePrompt("chooseFolder") });
  }

  template.push(
    { type: "separator" },
    { label: "Open SortDock", click: handlers.openApp },
    { label: "History", click: handlers.openHistory },
    { label: snapshot.settings.isSortingEnabled ? "Pause Sorting" : "Resume Sorting", click: handlers.toggleSorting },
    { label: "Run Setup Again", click: handlers.runSetupAgain },
    { type: "separator" },
    { label: "Quit SortDock", click: handlers.quit },
  );

  return template;
}
