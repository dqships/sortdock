import type { MovePromptChoice } from "../../shared/models/MovePromptChoice";

export type TrayMenuHandlers = {
  openApp(): void;
  openHistory(): void;
  toggleSorting(): void;
  runSetupAgain(): void;
  resolvePrompt(choice: MovePromptChoice): void;
  openUpdate(): void;
  quit(): void;
};
