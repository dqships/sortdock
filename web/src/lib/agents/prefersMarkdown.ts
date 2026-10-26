const HTML = "text/html";
const MARKDOWN = "text/markdown";

/** The q an Accept header gives a media type: from the most specific matching range, 0 when none matches. */
function quality(accept: string, type: string): number {
  const [major] = type.split("/");
  let bestSpecificity = 0;
  let bestQ = 0;
  for (const entry of accept.split(",")) {
    const [media = "", ...params] = entry.trim().split(";");
    const range = media.trim().toLowerCase();
    const specificity =
      range === type ? 3 : range === `${major}/*` ? 2 : range === "*/*" ? 1 : 0;
    if (specificity === 0 || specificity <= bestSpecificity) continue;
    const qParam = params
      .map((p) => p.trim().toLowerCase())
      .find((p) => p.startsWith("q="));
    const q = qParam ? Number(qParam.slice(2)) : 1;
    bestSpecificity = specificity;
    bestQ = Number.isFinite(q) ? Math.max(0, Math.min(1, q)) : 0;
  }
  return bestQ;
}

/** True when the client ranks text/markdown above text/html. Browsers never do; agents asking for Markdown do. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept?.toLowerCase().includes(MARKDOWN)) return false;
  const markdown = quality(accept, MARKDOWN);
  return markdown > 0 && markdown > quality(accept, HTML);
}
