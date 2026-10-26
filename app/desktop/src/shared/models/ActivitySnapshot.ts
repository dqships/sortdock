import type { ActivityRecord } from "./ActivityRecord";

export type ActivitySnapshot = ActivityRecord & {
  canChooseFolder: boolean;
  canLeave: boolean;
  canMove: boolean;
  canReveal: boolean;
  suggestedDestinationName: string | null;
};
