import { iconStroke, type IconProps } from "./IconProps";

export function PlusIcon({ size = 14, className }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...iconStroke}>
      <path d="M8 2.75v10.5M2.75 8h10.5" />
    </svg>
  );
}
