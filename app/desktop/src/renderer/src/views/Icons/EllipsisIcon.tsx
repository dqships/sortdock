import type { IconProps } from "./IconProps";

/** Three dots for "more options" buttons. */
export function EllipsisIcon({ size = 16, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <circle cx="3.5" cy="8" r="1.35" />
      <circle cx="8" cy="8" r="1.35" />
      <circle cx="12.5" cy="8" r="1.35" />
    </svg>
  );
}
