import { statusSummary } from "../../../../shared/labels/statusSummary";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { AppIcon } from "../Components/AppIcon";
import { StatusPill } from "../Components/StatusPill";

export function StatusStripView() {
  const snapshot = useSnapshot();
  const isSorting = snapshot.settings.isSortingEnabled;

  return (
    <header className="status-strip">
      <AppIcon size={34} />
      <div className="status-strip-text">
        <h1 className="status-strip-title">SortDock</h1>
        <p className="footnote truncate">{statusSummary(snapshot)}</p>
      </div>
      <StatusPill />
      <button
        type="button"
        className={isSorting ? "button" : "button button-primary"}
        onClick={() => void actions.toggleSorting()}
      >
        {isSorting ? "Pause" : "Resume"}
      </button>
    </header>
  );
}
