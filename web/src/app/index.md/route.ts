import { homeMarkdown } from "~/lib/agents/homeMarkdown";
import { markdownResponse } from "~/lib/agents/markdownResponse";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(homeMarkdown());
}
