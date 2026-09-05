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

## Release-aware download

The navigation, hero, and final download actions link to SortDock's live
[Mac App Store listing](https://apps.apple.com/us/app/my-file-manager-sortdock/id6804060639).
The destination is defined in `src/lib/release/appStoreRelease.ts`. The home
page no longer depends on GitHub release availability.

The previous GitHub installer flow remains available in the release helpers.
See `Documentation/github-release-download.md` for its publishing instructions.
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
deployments from the configured production branch.
