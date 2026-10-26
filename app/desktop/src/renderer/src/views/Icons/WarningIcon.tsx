import { iconStroke, type IconProps } from "./IconProps";

export function WarningIcon({ size = 12, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...iconStroke}>
      <path d="M8 2.25 14.25 13.25H1.75z" />
      <path d="M8 6.25v3.25" />
      <circle cx="8" cy="11.5" r="0.4" fill="currentColor" />
    </svg>
  );
}
