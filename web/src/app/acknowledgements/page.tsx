import type { Metadata } from "next";

import { pageMetadata } from "~/lib/site/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Acknowledgements and Open Source Credits",
  description:
    "The frameworks behind SortDock and its website, including SwiftUI, AppKit, Next.js, React, and Tailwind CSS, and where their licenses can be found.",
  path: "/acknowledgements",
});

export default function AcknowledgementsPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16 text-[var(--ink)]"><h1 className="font-serif text-5xl">Acknowledgements</h1><section className="mt-8 space-y-5"><p>The native SortDock app uses Apple system frameworks, including SwiftUI, AppKit, Foundation, and ServiceManagement.</p><p>The website is built with Next.js, React, and Tailwind CSS. Their licenses are included with their distributed packages.</p><p>SortDock source is available under this repository’s license.</p></section></main>;
}
