import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { ClockIcon } from "../Icons/ClockIcon";

export function ActivityStatusLine() {
  const { activities, statusMessage } = useSnapshot();
  const lastActivity = activities[0]?.message ?? "No files moved yet.";

  return (
    <footer className="activity-line">
      <ClockIcon />
      <span className="truncate" title={statusMessage}>
        {lastActivity}
      </span>
      <button type="button" className="button-borderless" onClick={() => void actions.showHistory()}>
        History
      </button>
    </footer>
  );
}
