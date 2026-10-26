# Agent Access

Last updated: 2026-10-26

## Purpose

AI agents and assistants can read SortDock's website as plain Markdown, so they
can explain what SortDock does and point people to the right page.

## What Ships

- `/llms.txt`: what SortDock is, when an agent should send a user here, and
  every page.
- `/index.md`: the home page as Markdown.
- Content negotiation in `src/proxy.ts`. A request whose `Accept` header ranks
  `text/markdown` above `text/html` gets:
  - the home page as Markdown at `/`,
  - a Markdown 404 with links home and to `/llms.txt` for a path with no page,
  - HTML for every other page.
  Browsers always get HTML.

Check it with:

```bash
curl -sS -i -H 'Accept: text/markdown' https://sortdock.followusai.com/
curl -sS -i -H 'Accept: text/markdown' https://sortdock.followusai.com/missing
```

## Where It Lives

`src/lib/agents/` holds the Accept parser, the Markdown bodies, and the list of
HTML pages. When you add a page, add it to `htmlRoutes.ts`, `sitemap.ts`, and
`llmsTxt.ts`, or agents asking for Markdown will get a 404 for it.
