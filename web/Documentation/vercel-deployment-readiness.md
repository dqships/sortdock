# Vercel Deployment Readiness

Last updated: 2026-08-13

## Purpose

The SortDock marketing site is configured to deploy from this mixed Mac-and-web
repository without shipping development-only behavior or stale release links.

## Vercel Project Settings

Use these values when importing the GitHub repository:

```text
Root directory: web
Framework preset: Next.js
Build command: npm run build
```

The committed `package-lock.json` keeps installs reproducible. No environment
variable is required for the first deployment.

Set `SITE_URL` after a custom domain is connected. Before then,
`VERCEL_PROJECT_PRODUCTION_URL` supplies the canonical production origin for
metadata, `robots.txt`, and `sitemap.xml`.

## Runtime And Security

- Next.js 16.3.0 and React 19.2.8 are pinned to a tested framework pair.
- The production dependency audit reports no known vulnerabilities.
- The `X-Powered-By` response header is disabled.
- Responses include `nosniff`, clickjacking, referrer, and unused browser
  capability protections.
- The home page is regenerated at most every 15 minutes with the latest GitHub
  release, or right away when the release workflow posts to the optional
  `VERCEL_DEPLOY_HOOK_URL`. If GitHub is unreachable, Mac still links to the
  App Store.
- The marketing page remains a Server Component tree and does not load the
  unused tRPC client provider.

## Search And Sharing

The site includes:

```text
web/src/app/robots.ts
web/src/app/sitemap.ts
web/src/app/opengraph-image.tsx
web/src/lib/site/siteMetadata.ts
web/src/lib/site/siteUrl.ts
```

Metadata includes a canonical URL, Open Graph fields, a large Twitter card, the
app icon, and a generated social image that uses the real SortDock brand asset.

## Environment Variables

```text
SITE_URL=https://your-domain.example
SORTDOCK_GITHUB_REPOSITORY=dqships/sortdock
GITHUB_RELEASE_TOKEN=
```

`SITE_URL` is needed only for a custom domain. The repository override and
read-only GitHub token are optional. `GITHUB_RELEASE_TOKEN` is server-only and
must never have a `NEXT_PUBLIC_` prefix.

## Verification

Before deploying:

```sh
cd web
npm ci
npm run check
npm run build
npm audit
```

The browser audit covers desktop, mobile, dark appearance, keyboard focus,
working in-page navigation, crawler endpoints, the social image, security
headers, and the Mac and Windows download actions.
