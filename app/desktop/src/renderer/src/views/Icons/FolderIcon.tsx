import { iconStroke, type IconProps } from "./IconProps";

/** Blue Finder-style folder used for every destination. */
export function FolderIcon({ size = 16, className = "folder-icon" }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" {...iconStroke}>
      <path d="M1.75 4.25a1.5 1.5 0 0 1 1.5-1.5h3.1a1 1 0 0 1 .8.4l.9 1.1h4.7a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-9.5a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M1.75 6.75h12.5" />
    </svg>
  );
}
