import { DownloadRail } from "~/app/_components/marketing/DownloadRail";
import { ProofPointRow } from "~/app/_components/marketing/ProofPointRow";

const proofPoints = [
  "Sort by file type, or use words like invoice and receipt for a more specific destination.",
  "Pick any folder on your computer. SortDock remembers it when you reopen the app.",
  "SortDock waits before moving so unfinished downloads are not touched.",
];

export function LandingStripSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="landing-strip-title"
      className="bg-[var(--window)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div className="relative">
          <div className="mb-4 text-sm font-semibold text-[var(--ink-muted)]">
            The Download Landing Strip
          </div>
          <DownloadRail />
        </div>

        <div>
          <h2
            id="landing-strip-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            New files get a place to land.
          </h2>
          <div className="mt-6">
            {proofPoints.map((proofPoint) => (
              <ProofPointRow key={proofPoint} text={proofPoint} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
