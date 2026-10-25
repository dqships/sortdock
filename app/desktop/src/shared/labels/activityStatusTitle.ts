import type { ActivityRecordStatus } from "../models/ActivityRecordStatus";

const titles: Record<ActivityRecordStatus, string> = {
  moved: "Moved",
  left: "Left",
  waiting: "Waiting",
  failed: "Needs attention",
  note: "History",
};

export function activityStatusTitle(status: ActivityRecordStatus): string {
  return titles[status];
}
