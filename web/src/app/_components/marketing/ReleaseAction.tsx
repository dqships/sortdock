import type { ReleaseState } from "~/lib/release/ReleaseState";

type ReleaseActionProps = {
  releaseState: ReleaseState;
  placement: "hero" | "nav" | "final";
};

const primaryClassName =
  "inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--accent-deep)] px-5 text-sm font-semibold text-white transition-colors outline-none hover:bg-[var(--button-primary-pressed)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]";
const navClassName =
  "inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--accent-soft)] px-4 text-sm font-semibold text-[var(--tag-text)] transition-colors outline-none hover:bg-[var(--line-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]";
const pendingClassName =
  "inline-flex min-h-11 items-center justify-center text-sm font-semibold text-[var(--ink-muted)]";

export function ReleaseAction({ releaseState, placement }: ReleaseActionProps) {
  const compact = placement === "nav";

  if (releaseState.status === "coming-soon") {
    return (
      <span
        className={compact ? `${pendingClassName} px-2` : pendingClassName}
        role="status"
      >
        {compact ? "Coming soon" : "Coming soon for Mac"}
      </span>
    );
  }

  return (
    <a
      className={compact ? navClassName : primaryClassName}
      href={releaseState.downloadUrl}
      rel="noreferrer"
      title={
        releaseState.status === "app-store"
          ? "Download SortDock on the Mac App Store"
          : `${releaseState.version} download`
      }
    >
      {releaseState.status === "app-store"
        ? compact
          ? "App Store"
          : "Download on the App Store"
        : compact
          ? "Download"
          : "Download for Mac"}
    </a>
  );
}
