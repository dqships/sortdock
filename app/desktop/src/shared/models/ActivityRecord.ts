import type { ActivityRecordStatus } from "./ActivityRecordStatus";

export type ActivityRecord = {
  id: string;
  message: string;
  date: number;
  status: ActivityRecordStatus;
  fileName: string | null;
  sourcePath: string | null;
  currentPath: string | null;
  destinationId: string | null;
  destinationName: string | null;
  snoozedUntil: number | null;
};
