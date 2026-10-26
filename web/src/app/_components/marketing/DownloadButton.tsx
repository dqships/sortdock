import type { DesktopPlatform } from "~/lib/release/DesktopPlatform";
import type { DownloadOption } from "~/lib/release/DownloadOption";
import { platformNames } from "~/lib/release/platformNames";

type DownloadButtonProps = {
  platform: DesktopPlatform;
  option: DownloadOption;
  isPrimary: boolean;
};

const primaryClassName =
  "inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--accent-deep)] px-5 text-sm font-semibold text-white transition-colors outline-none hover:bg-[var(--button-primary-pressed)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]";
const secondaryClassName =
  "inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] bg-[var(--panel)] px-5 text-sm font-semibold text-[var(--ink)] transition-colors outline-none hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]";
const pendingClassName =
  "inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-[var(--ink-muted)]";

export function DownloadButton({
  platform,
  option,
  isPrimary,
}: DownloadButtonProps) {
  const name = platformNames[platform];

  if (option.kind === "coming-soon") {
    return (
      <span className={pendingClassName} role="status">
        {name} coming soon
      </span>
    );
  }

  return (
    <a
      className={isPrimary ? primaryClassName : secondaryClassName}
      href={option.href}
      rel="noreferrer"
      title={
        option.kind === "app-store"
          ? "Get SortDock on the Mac App Store"
          : `Download SortDock for ${name}`
      }
    >
      {option.kind === "app-store"
        ? "Download on the App Store"
        : `Download for ${name}`}
    </a>
  );
}
