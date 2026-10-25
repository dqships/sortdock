import { ClockIcon } from "../Icons/ClockIcon";

export function HistoryEmptyStateView() {
  return (
    <div className="empty-state empty-state-centered">
      <ClockIcon size={24} />
      <strong>No history yet.</strong>
      <p className="footnote">Files will appear here after SortDock sees them.</p>
    </div>
  );
}
