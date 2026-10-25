import { SnapshotContext } from "./state/SnapshotContext";
import { useSortDockSnapshot } from "./state/useSortDockSnapshot";
import { MainWindowView } from "./views/Main/MainWindowView";
import { OnboardingView } from "./views/Onboarding/OnboardingView";

export function App() {
  const snapshot = useSortDockSnapshot();

  if (!snapshot) {
    return null;
  }

  return (
    <SnapshotContext.Provider value={snapshot}>
      <div className={`platform-${snapshot.platform}`}>
        {snapshot.settings.onboardingVersion < 1 ? <OnboardingView /> : <MainWindowView />}
      </div>
    </SnapshotContext.Provider>
  );
}
