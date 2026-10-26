import type { Metadata } from "next";

import { pageMetadata } from "~/lib/site/pageMetadata";
import { supportEmail } from "~/lib/site/supportEmail";

export const metadata: Metadata = pageMetadata({
  title: "About SortDock, the Downloads Organizer",
  description:
    "SortDock is a small Mac and Windows app from FollowUs AI, a software company in Michigan, USA. It keeps your Downloads folder sorted on your computer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[var(--ink)]">
      <h1 className="font-serif text-5xl">About SortDock</h1>
      <section className="mt-8 space-y-5">
        <p>
          SortDock watches one folder, usually Downloads, and moves new files
          into folders you choose. It sorts by file type or by words in the
          filename, and it can ask before every move.
        </p>
        <p>
          SortDock is made by{" "}
          <a
            className="font-semibold text-[var(--accent-deep)]"
            href="https://www.followusai.com"
          >
            FollowUs AI
          </a>
          , a small software company in Michigan, USA. It started as a Mac app
          and now runs on Mac and Windows.
        </p>
        <p>
          Everything happens on your computer. There is no account and no cloud
          sync. The source code is on{" "}
          <a
            className="font-semibold text-[var(--accent-deep)]"
            href="https://github.com/dqships/sortdock"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          Questions:{" "}
          <a
            className="font-semibold text-[var(--accent-deep)]"
            href={`mailto:${supportEmail}`}
          >
            {supportEmail}
          </a>
          .
        </p>
      </section>
    </main>
  );
}
