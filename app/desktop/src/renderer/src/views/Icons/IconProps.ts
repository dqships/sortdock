/** Shared props for the small stroke icons drawn to match SF Symbols' weight and metrics. */
export type IconProps = {
  /** Width and height in pixels. */
  size?: number;
  className?: string;
};

export const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
