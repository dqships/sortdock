import type { ActivityRecord } from "./ActivityRecord";
import type { DestinationFolder } from "./DestinationFolder";
import type { KeywordRule } from "./KeywordRule";
import type { RoutingRule } from "./RoutingRule";
import type { SortDockSettings } from "./SortDockSettings";

export type SortDockConfiguration = {
  settings: SortDockSettings;
  destinations: DestinationFolder[];
  rules: RoutingRule[];
  keywordRules: KeywordRule[];
  activities: ActivityRecord[];
};
