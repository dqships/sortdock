import { useState } from "react";

import { actions } from "../../state/actions";
import { useSnapshot } from "../../state/useSnapshot";
import { Sheet } from "../Components/Sheet";
import { HistoryDetailView } from "./HistoryDetailView";
import { HistoryEmptyStateView } from "./HistoryEmptyStateView";
import { HistoryListRowView } from "./HistoryListRowView";

export function HistorySheet({ onClose }: { onClose: () => void }) {
  const { activities } = useSnapshot();
  const [selectedId, setSelectedId] = useState<string | null>(activities[0]?.id ?? null);
  const selected = activities.find((activity) => activity.id === selectedId) ?? activities[0] ?? null;

  return (
    <Sheet title="History" onClose={onClose} isWide>
      <div className="history-header">
        <h2 className="sheet-title">History</h2>
        <button
          type="button"
          className="button button-danger"
          disabled={activities.length === 0}
          onClick={() => void actions.clearHistory()}
        >
          Clear History
        </button>
        <button type="button" className="button" onClick={onClose}>
          Done
        </button>
      </div>
      {selected ? (
        <div className="history-body">
          <ul className="history-list" role="listbox" aria-label="History">
            {activities.map((activity) => (
              <li key={activity.id}>
                <HistoryListRowView
                  activity={activity}
                  isSelected={activity.id === selected.id}
                  onSelect={() => setSelectedId(activity.id)}
                />
              </li>
            ))}
          </ul>
          <HistoryDetailView key={selected.id} activity={selected} />
        </div>
      ) : (
        <HistoryEmptyStateView />
      )}
    </Sheet>
  );
}
