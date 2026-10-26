import { useState } from "react";

import type { MoveBehavior } from "../../../../shared/models/MoveBehavior";
import { moveBehaviorSummary } from "../../../../shared/labels/moveBehaviorSummary";
import { normalizeKeywordList } from "../../../../shared/rules/normalizeKeywordList";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Checkbox } from "../Components/Checkbox";
import { DestinationSelect } from "../Components/DestinationSelect";
import { OnboardingLegalLinks } from "./OnboardingLegalLinks";

const lastStep = 6;

export function OnboardingView() {
  const snapshot = useSnapshot();
  const { settings, destinations, platform } = snapshot;
  const step = settings.onboardingStep;
  const [keyword, setKeyword] = useState("invoice");
  const [destinationId, setDestinationId] = useState<string | null>(destinations[0]?.id ?? null);
  const [automaticMoveAcknowledged, setAutomaticMoveAcknowledged] = useState(false);

  const destinationName = destinations.find((destination) => destination.id === destinationId)?.name ?? "Documents";
  const computerName = platform === "mac" ? "Mac" : "computer";
  const trayName = platform === "mac" ? "menu bar" : "system tray";
  const preview = `${keyword.trim() || "invoice"}-august.pdf → ${destinationName}`;

  const canContinue = (() => {
    switch (step) {
      case 2:
        return settings.hasChosenWatchedFolder;
      case 3:
        return destinationId !== null;
      case 4:
        return keyword.trim().length > 0 && destinationId !== null;
      case 5:
        return settings.moveBehavior !== "autoMove" || automaticMoveAcknowledged;
      default:
        return true;
    }
  })();

  const continueSetup = () => {
    if (step === 4 && destinationId && normalizeKeywordList(keyword).length > 0) {
      void actions.saveKeywordRule(null, keyword, destinationId, true);
    }

    if (step === lastStep) {
      void actions.completeOnboarding();
    } else {
      void actions.advanceOnboarding();
    }
  };

  const chooseDestination = () =>
    void actions.chooseDestinationFolder().then((id) => {
      if (id) {
        setDestinationId(id);
      }
    });

  return (
    <div className="onboarding">
      <h1 className="sheet-title">SortDock setup</h1>
      <progress
        className="onboarding-progress"
        value={step}
        max={lastStep}
        aria-label={`Setup step ${step} of ${lastStep}`}
      />

      <section className="onboarding-step">
        {step === 1 && (
          <>
            <h2>Keep Downloads organized</h2>
            <p>
              SortDock watches one folder and moves new files using rules you control. Everything happens on your{" "}
              {computerName}.
            </p>
            <p className="muted">No account. No cloud upload. Your files stay on your {computerName}.</p>
            <OnboardingLegalLinks />
          </>
        )}

        {step === 2 && (
          <>
            <h2>Choose a folder to watch</h2>
            <p>SortDock only looks at the folder you choose here.</p>
            {settings.hasChosenWatchedFolder && <strong>{snapshot.watchedFolderName}</strong>}
            <div className="link-row">
              <button type="button" className="button" onClick={() => void actions.useDownloadsFolder()}>
                Use Downloads
              </button>
              <button type="button" className="button" onClick={() => void actions.chooseWatchedFolder()}>
                Choose Another Folder
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Choose your first destination</h2>
            <p>This is where matching files will go. Pick one of these or choose any folder. You can change it later.</p>
            <DestinationSelect label="Move to" value={destinationId} onChange={setDestinationId} />
            <div>
              <button type="button" className="button" onClick={chooseDestination}>
                Choose Folder…
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Create your first keyword rule</h2>
            <label className="field-label">
              When a filename contains
              <input
                className="text-field"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>
            <DestinationSelect label="Move it to" value={destinationId} onChange={setDestinationId} />
            <p className="muted">{preview}</p>
            <p className="footnote">Keyword rules are checked before file-type rules.</p>
          </>
        )}

        {step === 5 && (
          <>
            <h2>Choose how SortDock acts</h2>
            <label className="inline-field">
              <span>Behavior</span>
              <select
                className="select-field"
                value={settings.moveBehavior}
                onChange={(event) =>
                  void actions.updateSettings({ moveBehavior: event.target.value as MoveBehavior })
                }
              >
                <option value="askFirst">Ask me before moving files</option>
                <option value="autoMove">Move matching files automatically</option>
              </select>
            </label>
            <Checkbox
              label="Ask Later"
              checked={settings.askLaterEnabled}
              onChange={(askLaterEnabled) => void actions.updateSettings({ askLaterEnabled })}
            />
            <Checkbox
              label="Launch at login"
              checked={settings.runAtLogin}
              onChange={(runAtLogin) => void actions.updateSettings({ runAtLogin })}
            />
            {settings.moveBehavior === "autoMove" && (
              <Checkbox
                label="I understand SortDock will move matching files using my rules."
                checked={automaticMoveAcknowledged}
                onChange={setAutomaticMoveAcknowledged}
              />
            )}
            <p className="footnote">SortDock keeps running in the {trayName} when you close its window.</p>
            <OnboardingLegalLinks />
          </>
        )}

        {step === 6 && (
          <>
            <h2>Ready to sort</h2>
            <p>Watched folder: {snapshot.watchedFolderName}</p>
            <p>First destination: {destinationName}</p>
            <p>First keyword: {keyword.trim() || "No keyword rule"}</p>
            <p>Behavior: {moveBehaviorSummary(settings.moveBehavior)}</p>
            <p>Launch at login: {settings.runAtLogin ? "On" : "Off"}</p>
            <p className="muted">Preview: {preview}</p>
          </>
        )}
      </section>

      <footer className="onboarding-footer">
        {step > 1 && (
          <button type="button" className="button" onClick={() => void actions.goBackInOnboarding()}>
            Back
          </button>
        )}
        <span className="spacer" />
        <button type="button" className="button button-primary" disabled={!canContinue} onClick={continueSetup}>
          {step === 1 ? "Set Up SortDock" : step === lastStep ? "Start Sorting" : "Continue"}
        </button>
      </footer>
    </div>
  );
}
