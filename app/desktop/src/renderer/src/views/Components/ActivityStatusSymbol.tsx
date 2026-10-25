import type { ActivityRecordStatus } from "../../../../shared/models/ActivityRecordStatus";
import { StatusGlyph } from "../Icons/StatusGlyph";

export function ActivityStatusSymbol({ status, size = 14 }: { status: ActivityRecordStatus; size?: number }) {
  return (
    <span className={`status-symbol-${status}`}>
      <StatusGlyph status={status} size={size} />
    </span>
  );
}
