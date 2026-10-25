import type { EditableSettings } from "../../shared/models/EditableSettings";
import { appearanceOptions } from "../../shared/options/appearanceOptions";
import { delayOptions } from "../../shared/options/delayOptions";
import { moveBehaviorOptions } from "../../shared/options/moveBehaviorOptions";
import { settingLimits } from "../../shared/options/settingLimits";
import { snoozeOptions } from "../../shared/options/snoozeOptions";
import { isRecord } from "./isRecord";
import { readNumberInRange } from "./readNumberInRange";
import { readOneOf } from "./readOneOf";

const values = <Value extends string>(options: readonly { value: Value }[]) => options.map((option) => option.value);

/** Keeps only the editable settings that are present and valid. */
export function decodeSettingsPatch(value: unknown): Partial<EditableSettings> {
  if (!isRecord(value)) {
    return {};
  }

  const patch: Partial<EditableSettings> = {};

  if ("moveBehavior" in value) {
    patch.moveBehavior = readOneOf(value.moveBehavior, values(moveBehaviorOptions), "askFirst");
  }
  if ("delayOption" in value) {
    patch.delayOption = readOneOf(value.delayOption, values(delayOptions), "tenSeconds");
  }
  if ("customDelaySeconds" in value) {
    patch.customDelaySeconds = readNumberInRange(value.customDelaySeconds, settingLimits.customDelaySeconds, 10);
  }
  if (typeof value.askLaterEnabled === "boolean") {
    patch.askLaterEnabled = value.askLaterEnabled;
  }
  if ("snoozeOption" in value) {
    patch.snoozeOption = readOneOf(value.snoozeOption, values(snoozeOptions), "tenMinutes");
  }
  if ("customSnoozeMinutes" in value) {
    patch.customSnoozeMinutes = readNumberInRange(value.customSnoozeMinutes, settingLimits.customSnoozeMinutes, 10);
  }
  if ("appearanceMode" in value) {
    patch.appearanceMode = readOneOf(value.appearanceMode, values(appearanceOptions), "system");
  }
  if (typeof value.runAtLogin === "boolean") {
    patch.runAtLogin = value.runAtLogin;
  }
  if ("defaultDestinationId" in value) {
    patch.defaultDestinationId = typeof value.defaultDestinationId === "string" ? value.defaultDestinationId : null;
  }

  return patch;
}
