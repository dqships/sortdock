import { MarketingPage } from "~/app/_components/marketing/MarketingPage";
import { appStoreRelease } from "~/lib/release/appStoreRelease";

export default function Home() {
  return <MarketingPage releaseState={appStoreRelease} />;
}
