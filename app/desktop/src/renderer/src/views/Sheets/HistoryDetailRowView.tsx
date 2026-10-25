export function HistoryDetailRowView({ title, value }: { title: string; value: string }) {
  return (
    <div className="history-detail-row">
      <dt>{title}</dt>
      <dd>{value}</dd>
    </div>
  );
}
