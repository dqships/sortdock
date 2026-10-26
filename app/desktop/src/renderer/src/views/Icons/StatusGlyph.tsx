import type { ReactNode } from "react";
import type { ActivityRecordStatus } from "../../../../shared/models/ActivityRecordStatus";
import { iconStroke, type IconProps } from "./IconProps";

type StatusGlyphProps = IconProps & {
  status: ActivityRecordStatus;
};

/** One small circle glyph per history status; the parent colors it. */
export function StatusGlyph({ status, size = 14, className }: StatusGlyphProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...iconStroke}>
      <circle cx="8" cy="8" r="6.25" />
      {statusMarks[status]}
    </svg>
  );
}

const statusMarks: Record<ActivityRecordStatus, ReactNode> = {
  moved: <path d="M5 8.2l2 2 4-4.4" />,
  left: <path d="M5 8h6" />,
  waiting: <path d="M8 4.75V8l2.25 1.4" />,
  failed: <path d="M5.75 5.75l4.5 4.5M10.25 5.75l-4.5 4.5" />,
  note: (
    <>
      <path d="M8 7.25v3.5" />
      <circle cx="8" cy="5.25" r="0.4" fill="currentColor" />
    </>
  ),
};
