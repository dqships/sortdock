import { actions } from "../../state/actions";

export function OnboardingLegalLinks() {
  return (
    <div className="link-row footnote">
      <button type="button" className="button-borderless" onClick={() => void actions.openLegalPage("privacy")}>
        Privacy
      </button>
      <button type="button" className="button-borderless" onClick={() => void actions.openLegalPage("terms")}>
        Terms
      </button>
    </div>
  );
}
