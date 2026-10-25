import type { ActivitySnapshot } from "../../../../shared/models/ActivitySnapshot";
import { activityStatusTitle } from "../../../../shared/labels/activityStatusTitle";
import { ActivityStatusSymbol } from "../Components/ActivityStatusSymbol";

type HistoryListRowViewProps = {
  activity: ActivitySnapshot;
  isSelected: boolean;
  onSelect: () => void;
};

const shortDate = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export function HistoryListRowView({ activity, isSelected, onSelect }: HistoryListRowViewProps) {
  return (
    <button
      type="button"
      role="option"
      className="history-list-row"
      aria-selected={isSelected}
      aria-label={`${activityStatusTitle(activity.status)}, ${activity.message}`}
      onClick={onSelect}
    >
      <ActivityStatusSymbol status={activity.status} />
      <span className="history-list-text">
        <strong className="truncate">{activity.fileName ?? activity.message}</strong>
        {activity.fileName && <span className="muted">{activity.message}</span>}
        <span className="muted">{shortDate.format(activity.date)}</span>
      </span>
    </button>
  );
}
