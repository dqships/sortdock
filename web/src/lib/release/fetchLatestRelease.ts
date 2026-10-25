import { env } from "~/env";

import { getGitHubReleaseApiUrl } from "./getGitHubReleaseApiUrl";

const defaultRepository = "dqships/sortdock";
const releaseCheckIntervalSeconds = 900;

/** The latest published GitHub release, or null when GitHub has none or cannot be reached. */
export async function fetchLatestRelease(
  request: typeof fetch = fetch,
): Promise<unknown> {
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

    return response.ok ? ((await response.json()) as unknown) : null;
  } catch {
    return null;
  }
}
