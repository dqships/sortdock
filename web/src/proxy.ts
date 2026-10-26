import { NextResponse, type NextRequest } from "next/server";

import { homeMarkdown } from "~/lib/agents/homeMarkdown";
import { htmlRoutes } from "~/lib/agents/htmlRoutes";
import { markdownResponse } from "~/lib/agents/markdownResponse";
import { notFoundMarkdown } from "~/lib/agents/notFoundMarkdown";
import { prefersMarkdown } from "~/lib/agents/prefersMarkdown";

/**
 * Content negotiation for agents. A request that prefers text/markdown gets the
 * home page as Markdown, or a Markdown 404 for a path with no page. Other pages
 * keep serving HTML. Browsers always get HTML, with `Vary: Accept`.
 */
export function proxy(req: NextRequest) {
  if (!prefersMarkdown(req.headers.get("accept"))) {
    return NextResponse.next({ headers: { Vary: "Accept" } });
  }
  const path = req.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return markdownResponse(homeMarkdown());
  if (htmlRoutes.includes(path)) {
    return NextResponse.next({ headers: { Vary: "Accept" } });
  }
  return markdownResponse(notFoundMarkdown(path), 404);
}

export const config = {
  // Pages only: skip Next internals, API and download routes, and files with an extension.
  matcher: [
    "/((?!_next/|api/|download/|_vercel/|opengraph-image|.*\\.[\\w]+$).*)",
  ],
};
