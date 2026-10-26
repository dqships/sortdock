import type { ActivitySnapshot } from "../../../../shared/models/ActivitySnapshot";
import { activityStatusTitle } from "../../../../shared/labels/activityStatusTitle";
import { snoozeRemainingText } from "../../../../shared/labels/snoozeRemainingText";
import { ActivityStatusSymbol } from "../Components/ActivityStatusSymbol";
import { HistoryActionBarView } from "./HistoryActionBarView";
import { HistoryDetailRowView } from "./HistoryDetailRowView";
import { useNow } from "./useNow";

const fullDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

export function HistoryDetailView({ activity }: { activity: ActivitySnapshot }) {
  const isWaiting = activity.status === "waiting";
  const now = useNow(isWaiting);
  const statusTitle = activityStatusTitle(activity.status);

  return (
    <section className="history-detail" aria-label="Details">
      <div className="history-detail-header">
        <ActivityStatusSymbol status={activity.status} size={18} />
        <div className="grow">
          <strong>{activity.fileName ?? "History"}</strong>
          <p className="footnote">{activity.message}</p>
        </div>
        <span className="footnote">{statusTitle}</span>
      </div>
      <dl className="history-detail-rows">
        <HistoryDetailRowView title="Status" value={statusTitle} />
        {activity.suggestedDestinationName && (
          <HistoryDetailRowView title="Folder" value={activity.suggestedDestinationName} />
        )}
        <HistoryDetailRowView title="When" value={fullDate.format(activity.date)} />
        {isWaiting && <HistoryDetailRowView title="Ask Later" value={snoozeRemainingText(activity.snoozedUntil, now)} />}
      </dl>
      {!activity.canReveal && activity.status !== "note" ? (
        <p className="footnote">SortDock cannot find this file anymore.</p>
      ) : (
        <div />
      )}
      <div />
      <HistoryActionBarView activity={activity} />
    </section>
  );
}
