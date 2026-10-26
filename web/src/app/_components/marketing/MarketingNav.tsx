import Image from "next/image";
import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="absolute top-0 left-0 z-30 w-full px-5 py-5 md:px-10 lg:px-[72px]">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between rounded-[8px] border border-[var(--nav-border)] bg-[var(--nav-bg)] px-3 shadow-[0_3px_8px_var(--dock-shadow)] backdrop-blur-md md:px-4"
      >
        <Link
          href="#top"
          className="flex items-center gap-2 rounded-[8px] text-sm font-semibold text-[var(--ink)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        >
          <Image
            src="/brand/icon.png"
            alt="SortDock icon"
            width={32}
            height={32}
            className="size-8 rounded-[8px]"
            priority
          />
          <span>SortDock</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="#how-it-works"
            className="hidden rounded-[8px] px-3 py-2 text-[var(--ink-muted)] transition-colors outline-none hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] sm:inline-flex"
          >
            How it works
          </Link>
          <Link
            href="#keyword-rules"
            className="hidden rounded-[8px] px-3 py-2 text-[var(--ink-muted)] transition-colors outline-none hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] md:inline-flex"
          >
            Keyword rules
          </Link>
          <Link
            href="#privacy"
            className="hidden rounded-[8px] px-3 py-2 text-[var(--ink-muted)] transition-colors outline-none hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] sm:inline-flex"
          >
            Privacy
          </Link>
          <Link
            href="#download"
            className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--accent-soft)] px-4 text-sm font-semibold text-[var(--tag-text)] transition-colors outline-none hover:bg-[var(--line-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            Download
          </Link>
        </div>
      </nav>
    </header>
  );
}
