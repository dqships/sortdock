import type { SortDockActions } from "./SortDockActions";

/** The allowlist the background process checks before running an action from the window. */
export const sortDockActionNames = [
  "addDestination",
  "chooseDestinationFolder",
  "chooseWatchedFolder",
  "useDownloadsFolder",
  "renameDestination",
  "reconnectDestination",
  "removeDestination",
  "saveRule",
  "duplicateRule",
  "deleteRule",
  "saveKeywordRule",
  "setKeywordRuleEnabled",
  "moveKeywordRule",
  "deleteKeywordRule",
  "updateSettings",
  "toggleSorting",
  "advanceOnboarding",
  "goBackInOnboarding",
  "completeOnboarding",
  "runSetupAgain",
  "resolveActivePrompt",
  "moveActivity",
  "leaveActivity",
  "chooseFolderForActivity",
  "revealActivity",
  "showHistory",
  "hideHistory",
  "clearHistory",
  "openUpdate",
  "openLegalPage",
] as const satisfies readonly (keyof SortDockActions)[];

export type SortDockActionName = (typeof sortDockActionNames)[number];

type UnlistedAction = Exclude<keyof SortDockActions, SortDockActionName>;

/** Fails to compile when an action is added to SortDockActions but not to the allowlist. */
export const everyActionIsListed: [UnlistedAction] extends [never] ? true : never = true;
