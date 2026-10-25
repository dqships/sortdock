import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms", description: "Terms for SortDock." };

export default function TermsPage() {
  return <main className="mx-auto max-w-3xl px-6 py-16 text-[var(--ink)]"><h1 className="font-serif text-5xl">Terms</h1><section className="mt-8 space-y-5"><p>SortDock is a local file-sorting utility. You are responsible for choosing folders, rules, and destinations, and for keeping backups of important files.</p><p>Download workflows vary by app and browser, so SortDock cannot guarantee identical behavior in every third-party workflow. SortDock never intentionally overwrites a file, but you should review your rules before enabling automatic moves.</p><p>Use SortDock lawfully and only with files and folders you are allowed to manage.</p><p>SortDock is provided as available, without warranties beyond those that cannot legally be excluded. To the fullest extent permitted by law, Follow Us AI is not liable for indirect or consequential loss arising from use of the app.</p><p>The App Store version uses Apple’s standard End User License Agreement. The Mac and Windows versions downloaded from this website are covered by these terms. Questions: <a className="font-semibold text-[var(--accent-deep)]" href="mailto:dq@followusai.com">dq@followusai.com</a>.</p></section></main>;
}
