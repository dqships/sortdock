# SortDock website

The `web` directory contains SortDock's Next.js marketing site.

## License

The website source code is available under the [MIT License](../LICENSE). The
SortDock name, logos, icons, and other brand assets are not covered by that
license. See [BRAND_ASSETS.md](../BRAND_ASSETS.md).

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Mac and Windows downloads

The hero and final sections offer SortDock for Mac and Windows, with the
visitor's own computer first. `/download/mac` and `/download/windows` always
redirect to the newest installer on the latest GitHub release. Until a Mac
installer is published, Mac links to the
[Mac App Store listing](https://apps.apple.com/us/app/my-file-manager-sortdock/id6804060639);
until a Windows installer is published, Windows shows "coming soon".

Installers are built from `app/desktop` by the `Desktop release` GitHub
workflow. See `Documentation/github-release-download.md`.
Copy `.env.example` when you need to override the public site URL.

## Checks

```sh
npm run check
npm run build
```

## Vercel

When importing the Git repository into Vercel:

- Set the project root directory to `web`.
- Keep the detected framework as Next.js.
- Keep the detected install command and use `npm run build` as the build command.
- Set `SITE_URL` to the final custom domain when one is connected. Vercel's
  production URL is used automatically until then.
- Optionally set `GITHUB_RELEASE_TOKEN` to a fine-grained, read-only token if the
  unauthenticated GitHub API limit becomes an issue. Do not expose it as a
  `NEXT_PUBLIC_` variable.

Vercel Git integration will build preview deployments for branches and production
deployments from the configured production branch, except where
`scripts/vercel-ignore-build.mjs` (the `ignoreCommand` in `web/vercel.json`)
skips them: previews on `claude/` and `codex/` branches, and pushes that change
nothing in `web/`.
