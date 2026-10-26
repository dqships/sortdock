import { delayOptions } from "../../../../shared/options/delayOptions";
import { moveBehaviorOptions } from "../../../../shared/options/moveBehaviorOptions";
import { settingLimits } from "../../../../shared/options/settingLimits";
import { snoozeOptions } from "../../../../shared/options/snoozeOptions";
import type { DelayOption } from "../../../../shared/models/DelayOption";
import type { SnoozeOption } from "../../../../shared/models/SnoozeOption";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Checkbox } from "../Components/Checkbox";
import { DestinationSelect } from "../Components/DestinationSelect";
import { NumberField } from "../Components/NumberField";
import { SectionTitle } from "../Components/SectionTitle";
import { SegmentedControl } from "../Components/SegmentedControl";

export function BehaviorSettingsView() {
  const { settings } = useSnapshot();

  return (
    <section className="section" aria-labelledby="behavior-title">
      <SectionTitle id="behavior-title" title="Behavior" />
      <div className="settings-stack">
        <SegmentedControl
          label="Move behavior"
          options={moveBehaviorOptions}
          value={settings.moveBehavior}
          onChange={(moveBehavior) => void actions.updateSettings({ moveBehavior })}
        />

        <div className="inline-field">
          <label className="inline-field">
            <span>Wait</span>
            <select
              className="select-field"
              value={settings.delayOption}
              onChange={(event) => void actions.updateSettings({ delayOption: event.target.value as DelayOption })}
            >
              {delayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {settings.delayOption === "custom" && (
            <NumberField
              label="Seconds to wait"
              unit="sec"
              value={settings.customDelaySeconds}
              {...settingLimits.customDelaySeconds}
              onChange={(customDelaySeconds) => void actions.updateSettings({ customDelaySeconds })}
            />
          )}
        </div>

        <Checkbox
          label="Ask Later"
          checked={settings.askLaterEnabled}
          onChange={(askLaterEnabled) => void actions.updateSettings({ askLaterEnabled })}
        />

        {settings.askLaterEnabled && (
          <div className="inline-field">
            <label className="inline-field">
              <span>Snooze</span>
              <select
                className="select-field"
                value={settings.snoozeOption}
                onChange={(event) =>
                  void actions.updateSettings({ snoozeOption: event.target.value as SnoozeOption })
                }
              >
                {snoozeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {settings.snoozeOption === "custom" && (
              <NumberField
                label="Minutes to snooze"
                unit="min"
                value={settings.customSnoozeMinutes}
                {...settingLimits.customSnoozeMinutes}
                onChange={(customSnoozeMinutes) => void actions.updateSettings({ customSnoozeMinutes })}
              />
            )}
          </div>
        )}

        <DestinationSelect
          label="Other files"
          value={settings.defaultDestinationId}
          emptyOptionLabel="Leave in place"
          onChange={(defaultDestinationId) => void actions.updateSettings({ defaultDestinationId })}
        />
      </div>
    </section>
  );
}
