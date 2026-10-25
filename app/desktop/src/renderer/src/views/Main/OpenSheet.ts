export type OpenSheet =
  | { kind: "rule"; ruleId: string | null }
  | { kind: "keywordRule"; ruleId: string | null }
  | { kind: "destination"; destinationId: string | null }
  | null;
