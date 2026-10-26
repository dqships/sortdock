import { ProofPointRow } from "~/app/_components/marketing/ProofPointRow";

const proofItems = [
  {
    text: "Local preferences",
    detail: "Your rules live on your computer.",
  },
  {
    text: "No accounts",
    detail: "Open the app and sort files without signing in.",
  },
  {
    text: "No cloud sync",
    detail: "Sorting works without sending your files anywhere.",
  },
  {
    text: "No overwrite surprises",
    detail: "If a name already exists, SortDock uses a safe new name.",
  },
];

export function PrivacyProofSection() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-title"
      className="bg-[image:var(--section-tint)] px-5 py-14 md:px-10 md:py-[88px] lg:px-[72px]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <h2
            id="privacy-title"
            className="font-serif text-3xl leading-tight font-bold text-[var(--ink)] md:text-5xl"
          >
            Keep control close to home.
          </h2>
        </div>

        <div className="border-y border-[var(--line)]">
          {proofItems.map((proofItem) => (
            <ProofPointRow
              key={proofItem.text}
              text={proofItem.text}
              detail={proofItem.detail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
