import { useSnapshot } from "../../state/useSnapshot";

export function StatusPill() {
  const { statusTitle, statusTone } = useSnapshot();
  const dotClass = statusTone === "paused" ? "status-dot" : `status-dot status-dot-${statusTone}`;

  return (
    <span className="status-pill" role="status">
      <span className={dotClass} aria-hidden="true" />
      {statusTitle}
    </span>
  );
}
