# Contributing to SortDock

Thanks for helping make SortDock better. Start by checking existing issues and
pull requests so work does not get duplicated.

## What to change

- Keep SortDock small, clear, and native-feeling.
- Keep user-facing words short and easy to understand.
- Do not change the SortDock name, logos, icons, or other brand assets unless
  you have permission. See [BRAND_ASSETS.md](BRAND_ASSETS.md).
- Never add behavior that overwrites a user's files.

## Set up the Mac and Windows app

```sh
cd app/desktop
npm ci
npm run dev
```

Run its checks before opening a pull request:

```sh
cd app/desktop
npm run check
npm run build
```

## Set up the website

```sh
cd web
npm ci
npm run dev
```

Run the website checks before opening a pull request:

```sh
cd web
npm run check
npm run build
```

## Pull requests

- Make one focused change per pull request.
- Explain the problem, the change, and how you checked it.
- Include screenshots for visible app or website changes.
- Keep files focused: one component, helper, model, or type per file.
- Add or update the matching documentation when behavior changes.
- Do not include generated build output, local settings, or unrelated cleanup.

By contributing, you agree that your contribution may be distributed under the
[MIT License](LICENSE).
