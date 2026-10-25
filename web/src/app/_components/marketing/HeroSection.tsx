import Link from "next/link";

import { HeroProductImage } from "~/app/_components/marketing/HeroProductImage";
import { DownloadActions } from "~/app/_components/marketing/DownloadActions";
import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";

type HeroSectionProps = {
  downloads: DesktopDownloads;
};

export function HeroSection({ downloads }: HeroSectionProps) {
  return (
    <section
      id="top"
      data-testid="hero"
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[840px] overflow-hidden md:min-h-[780px] lg:min-h-[720px]"
    >
      <HeroProductImage />

      <div className="relative z-10 mx-auto flex h-full max-w-[1180px] items-start px-5 pt-28 md:items-center md:px-10 md:pt-0 lg:items-start lg:px-[72px] lg:pt-32">
        <div className="max-w-[420px]" data-testid="hero-copy">
          <h1
            id="hero-title"
            className="font-serif text-5xl leading-[0.95] font-bold text-[var(--ink)] sm:text-6xl xl:text-7xl"
          >
            SortDock
          </h1>
          <p className="mt-5 max-w-[440px] text-2xl leading-tight font-semibold text-[var(--ink)] sm:text-3xl">
            Keep Downloads clean without babysitting every file.
          </p>
          <p className="mt-5 max-w-[400px] text-base leading-7 text-[var(--ink-muted)] sm:text-lg">
            Choose folders, sort by file type or words in the filename, and let
            new downloads land where they belong. Ask first or move
            automatically.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <DownloadActions downloads={downloads} />
            <Link
              href="#how-it-works"
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-[var(--ink)] transition-colors outline-none hover:text-[var(--accent-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              See how it sorts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
