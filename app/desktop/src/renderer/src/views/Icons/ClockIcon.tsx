import { iconStroke, type IconProps } from "./IconProps";

export function ClockIcon({ size = 14, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...iconStroke}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.5 1.6" />
    </svg>
  );
}
