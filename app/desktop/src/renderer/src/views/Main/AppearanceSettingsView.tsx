import { appearanceOptions } from "../../../../shared/options/appearanceOptions";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Checkbox } from "../Components/Checkbox";
import { SectionTitle } from "../Components/SectionTitle";
import { SegmentedControl } from "../Components/SegmentedControl";

export function AppearanceSettingsView() {
  const { settings } = useSnapshot();

  return (
    <section className="section" aria-labelledby="appearance-title">
      <SectionTitle id="appearance-title" title="Appearance" />
      <div className="settings-stack">
        <SegmentedControl
          label="Theme"
          options={appearanceOptions}
          value={settings.appearanceMode}
          onChange={(appearanceMode) => void actions.updateSettings({ appearanceMode })}
        />
        <Checkbox
          label="Run at login"
          checked={settings.runAtLogin}
          onChange={(runAtLogin) => void actions.updateSettings({ runAtLogin })}
        />
      </div>
    </section>
  );
}
