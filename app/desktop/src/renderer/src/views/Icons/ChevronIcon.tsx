import { iconStroke, type IconProps } from "./IconProps";

type ChevronIconProps = IconProps & {
  direction: "up" | "down" | "left" | "right";
};

const rotation = { up: 180, down: 0, left: 90, right: -90 } as const;

export function ChevronIcon({ direction, size = 14, className }: ChevronIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
      {...iconStroke}
    >
      <path d="M3.5 6l4.5 4.5L12.5 6" />
    </svg>
  );
}
