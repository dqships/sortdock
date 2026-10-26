import type { SortDockConfiguration } from "../../shared/models/SortDockConfiguration";
import { createDefaultConfiguration } from "./createDefaultConfiguration";
import { decodeActivities } from "./decodeActivities";
import { decodeDestinations } from "./decodeDestinations";
import { decodeKeywordRules } from "./decodeKeywordRules";
import { decodeRoutingRules } from "./decodeRoutingRules";
import { decodeSettings } from "./decodeSettings";
import { isRecord } from "./isRecord";

export const maxActivityCount = 20;

/** Reads saved settings defensively so a damaged file never stops the app from opening. */
export function decodeConfiguration(value: unknown, defaultWatchedFolderPath: string): SortDockConfiguration {
  if (!isRecord(value)) {
    return createDefaultConfiguration(defaultWatchedFolderPath);
  }

  const destinations = decodeDestinations(value.destinations);
  const destinationIds = new Set(destinations.map((destination) => destination.id));
  const settings = decodeSettings(value.settings, defaultWatchedFolderPath);

  if (settings.defaultDestinationId !== null && !destinationIds.has(settings.defaultDestinationId)) {
    settings.defaultDestinationId = null;
  }

  return {
    settings,
    destinations,
    rules: decodeRoutingRules(value.rules, destinationIds),
    keywordRules: decodeKeywordRules(value.keywordRules, destinationIds),
    activities: decodeActivities(value.activities).slice(0, maxActivityCount),
  };
}
