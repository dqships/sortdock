import { NextResponse } from "next/server";

import { fetchLatestRelease } from "~/lib/release/fetchLatestRelease";
import { isDesktopPlatform } from "~/lib/release/isDesktopPlatform";
import { resolveDownloadTarget } from "~/lib/release/resolveDownloadTarget";

type DownloadRouteContext = {
  params: Promise<{ platform: string }>;
};

/** Stable links such as /download/windows that always point at the newest installer. */
export async function GET(request: Request, context: DownloadRouteContext) {
  const { platform } = await context.params;

  if (!isDesktopPlatform(platform)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const target = resolveDownloadTarget(await fetchLatestRelease(), platform);

  return NextResponse.redirect(
    target ?? new URL("/#download", request.url),
    302,
  );
}
