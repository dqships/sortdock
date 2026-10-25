import type { ActivitySnapshot } from "./ActivitySnapshot";
import type { AppUpdate } from "./AppUpdate";
import type { DesktopPlatform } from "./DesktopPlatform";
import type { DestinationSnapshot } from "./DestinationSnapshot";
import type { KeywordRule } from "./KeywordRule";
import type { PendingMovePrompt } from "./PendingMovePrompt";
import type { RoutingRule } from "./RoutingRule";
import type { SortDockSettings } from "./SortDockSettings";
import type { StatusTone } from "./StatusTone";

export type SortDockSnapshot = {
  platform: DesktopPlatform;
  settings: SortDockSettings;
  destinations: DestinationSnapshot[];
  rules: RoutingRule[];
  keywordRules: KeywordRule[];
  activities: ActivitySnapshot[];
  prompts: PendingMovePrompt[];
  statusMessage: string;
  statusTitle: string;
  statusTone: StatusTone;
  watchedFolderName: string;
  isHistoryPresented: boolean;
  availableUpdate: AppUpdate | null;
};
