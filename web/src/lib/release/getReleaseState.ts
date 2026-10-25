import { env } from "~/env";

import { getGitHubReleaseApiUrl } from "./getGitHubReleaseApiUrl";
import { readReleaseVersion } from "./readReleaseVersion";
import type { ReleaseState } from "./ReleaseState";
import { selectMacReleaseAsset } from "./selectMacReleaseAsset";

const defaultRepository = "dqships/sortdock";
const releaseCheckIntervalSeconds = 900;

export async function getReleaseState(
  request: typeof fetch = fetch,
): Promise<ReleaseState> {
  const repository = env.SORTDOCK_GITHUB_REPOSITORY ?? defaultRepository;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (env.GITHUB_RELEASE_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_RELEASE_TOKEN}`;
  }

  try {
    const response = await request(getGitHubReleaseApiUrl(repository), {
      headers,
      next: { revalidate: releaseCheckIntervalSeconds },
    });

    if (!response.ok) {
      return { status: "coming-soon" };
    }

    const release: unknown = await response.json();
    const asset = selectMacReleaseAsset(release);

    if (!asset) {
      return { status: "coming-soon" };
    }

    return {
      status: "available",
      downloadUrl: asset.downloadUrl,
      version: readReleaseVersion(release),
    };
  } catch {
    return { status: "coming-soon" };
  }
}
