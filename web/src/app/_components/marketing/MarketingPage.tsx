import { BehaviorComparison } from "~/app/_components/marketing/BehaviorComparison";
import { DesktopFitSection } from "~/app/_components/marketing/DesktopFitSection";
import { FinalCtaSection } from "~/app/_components/marketing/FinalCtaSection";
import { HeroSection } from "~/app/_components/marketing/HeroSection";
import { LandingStripSection } from "~/app/_components/marketing/LandingStripSection";
import { MarketingFooter } from "~/app/_components/marketing/MarketingFooter";
import { MarketingNav } from "~/app/_components/marketing/MarketingNav";
import { PrivacyProofSection } from "~/app/_components/marketing/PrivacyProofSection";
import { RulesSection } from "~/app/_components/marketing/RulesSection";
import type { DesktopDownloads } from "~/lib/release/DesktopDownloads";

type MarketingPageProps = {
  downloads: DesktopDownloads;
};

export function MarketingPage({ downloads }: MarketingPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--window)] text-[var(--ink)]">
      <MarketingNav />
      <main>
        <HeroSection downloads={downloads} />
        <LandingStripSection />
        <BehaviorComparison />
        <RulesSection />
        <PrivacyProofSection />
        <DesktopFitSection />
        <FinalCtaSection downloads={downloads} />
      </main>
      <MarketingFooter downloads={downloads} />
    </div>
  );
}
