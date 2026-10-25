import type { ActivitySnapshot } from "../../../../shared/models/ActivitySnapshot";
import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";

export function HistoryActionBarView({ activity }: { activity: ActivitySnapshot }) {
  const { platform } = useSnapshot();
  const hasActions = activity.canReveal || activity.canLeave || activity.canChooseFolder || activity.canMove;

  if (!hasActions) {
    return <p className="footnote">No actions available.</p>;
  }

  return (
    <div className="history-actions">
      {activity.canReveal && (
        <button type="button" className="button" onClick={() => void actions.revealActivity(activity.id)}>
          {platform === "windows" ? "Show in Folder" : "Go to File"}
        </button>
      )}
      <span className="spacer" />
      {activity.canLeave && (
        <button type="button" className="button" onClick={() => void actions.leaveActivity(activity.id)}>
          Leave
        </button>
      )}
      {activity.canChooseFolder && (
        <button type="button" className="button" onClick={() => void actions.chooseFolderForActivity(activity.id)}>
          Choose…
        </button>
      )}
      {activity.canMove && (
        <button type="button" className="button button-primary" onClick={() => void actions.moveActivity(activity.id)}>
          Move
        </button>
      )}
    </div>
  );
}
