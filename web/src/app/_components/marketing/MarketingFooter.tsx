import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";
import { downloadAvailabilityLabel } from "~/lib/release/downloadAvailabilityLabel";

type MarketingFooterProps = {
  downloads: DesktopDownloads;
};

export function MarketingFooter({ downloads }: MarketingFooterProps) {
  const releaseLabel = downloadAvailabilityLabel(downloads);

  return (
    <footer className="bg-[var(--window)] px-5 py-8 md:px-10 lg:px-[72px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-center gap-x-5 gap-y-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--ink-muted)] sm:flex sm:flex-wrap sm:gap-x-6">
        <p className="font-semibold text-[var(--ink)]">SortDock</p>
        <span>{releaseLabel}</span>
        <span>Sorting stays local.</span>
        <a
          className="font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-deep)]"
          href="https://github.com/dqships/sortdock"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-deep)]"
          href="/support"
        >
          Support
        </a>
        <a
          className="font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-deep)]"
          href="/privacy"
        >
          Privacy
        </a>
        <a
          className="font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-deep)]"
          href="/terms"
        >
          Terms
        </a>
        <a
          className="font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-deep)]"
          href="/acknowledgements"
        >
          Acknowledgements
        </a>
      </div>
    </footer>
  );
}
