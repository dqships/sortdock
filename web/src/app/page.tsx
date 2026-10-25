import { MarketingPage } from "~/app/_components/marketing/MarketingPage";
import { getDesktopDownloads } from "~/lib/release/getDesktopDownloads";

// Check GitHub for new installers at most every 15 minutes.
export const revalidate = 900;

export default async function Home() {
  return <MarketingPage downloads={await getDesktopDownloads()} />;
}
