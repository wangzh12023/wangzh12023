# Website deployment

- Canonical source: https://github.com/wangzh12023/wangzh12023 (`main`).
- GitHub Pages: https://wangzh12023.github.io/
- Vercel production: https://zihan-wang-portfolio.vercel.app/
- Theme branches: `theme/violet` retains the violet presentation; `archive/themes` retains the historical theme study.

The root README and its profile assets belong to the GitHub profile. Preserve them when editing the website. Website development notes are in [WEBSITE.md](WEBSITE.md), design notes in [DESIGN.md](DESIGN.md), and asset sources in [ASSETS.md](ASSETS.md).

## Publishing

Push website changes to `origin/main`. Vercel is connected directly to this repository and automatically builds the production branch with `npm run build`, serving `dist`.

`wangzh12023/wangzh12023.github.io` is a small hosting repository. Its Pages workflow checks out this source repository's `main` branch, builds it, and deploys `dist` at the original root URL. It checks for a changed source revision every 15 minutes (GitHub schedules may be delayed), without a cross-repository personal access token. To publish immediately after pushing:

```sh
gh workflow run pages.yml --repo wangzh12023/wangzh12023.github.io
```

The public `/_deployment.json` file on Pages records the source SHA. The hosting repository no longer contains or deploys the previous documentation site.

## Local worktrees

The local `main`, `theme/violet`, and `archive/themes` worktrees now track branches under `wangzh12023/wangzh12023`. The website build and UI are unchanged by the repository migration. Local preview services remain stopped.
