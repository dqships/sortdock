import Link from "next/link";

import { DownloadActions } from "~/app/_components/marketing/DownloadActions";
import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";

type FinalCtaSectionProps = {
  downloads: DesktopDownloads;
};

export function FinalCtaSection({ downloads }: FinalCtaSectionProps) {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="bg-[image:var(--section-tint)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 border-y border-[var(--line)] py-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-[720px]">
          <h2
            id="download-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Clean up Downloads once. Keep it clean after that.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Pick the folders you care about, add file-type or keyword rules, and
            choose whether SortDock asks first or moves quietly.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center md:justify-end">
          <DownloadActions downloads={downloads} />
          <Link
            href="#how-it-works"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-[var(--ink)] transition-colors outline-none hover:text-[var(--accent-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
