# Zihan Wang · 王子涵

A bilingual personal homepage for research, projects, open-source contributions, teaching, and photography. English is the default; `?lang=zh` opens the Chinese version. The five themes share the same layout and content.

## Local development

```sh
npm ci
npm run dev -- --port 5173
npm run build
npm run preview
```

| Preview | URL | Default theme |
| --- | --- | --- |
| Main checkout | http://localhost:5173/?lang=en | Cream violet |
| Pink worktree | http://localhost:5174/?lang=en | Rose pink |
| Green worktree | http://localhost:5175/?lang=en | Sage green |
| Blue worktree | http://localhost:5176/?lang=en | Slate blue |
| Terracotta worktree | http://localhost:5177/?lang=en | Warm terracotta |

A theme can also be opened directly with `?theme=violet`, `?theme=pink`, `?theme=green`, `?theme=blue`, or `?theme=terracotta`. An explicit URL preference wins over a saved preference. Language selection is explicit: the site does not automatically switch based on the browser language.

## Editing content

- `src/data.ts`: English research and project records, links, media, and detail copy.
- `src/data-zh.ts`: Chinese project translations keyed by stable project IDs.
- `src/i18n.ts`: Shared UI and homepage translations.
- `src/main.ts`: Page rendering and interactions.
- `src/styles.css`: Layout and shared theme variables.
- `src/theme-default.ts`: Default theme for each worktree.
- `public/cv.html`: Bilingual CV with print / PDF styles.
- `public/assets/`: Locally hosted portrait, research figures, project media, and portfolio photographs.

The two languages use the same image files, links, project IDs, and underlying facts. A language switch keeps the current section, project filter, theme, and open project detail. Project detail hashes such as `#work/objecttalk` can be shared directly.

## Hosting

The app builds to `dist/` and has no backend or runtime secrets. `vercel.json` provides the Vite build configuration. GitHub Actions checks production builds on pushes and pull requests. Vercel deploys the `main` branch through its Git integration.

Original application documents and research notes are intentionally excluded from version control and deployment. The public CV contains professional contact details only.

## Design and image credits

The academic layout is independently implemented with reference to [Long Ling’s homepage](https://long-ling.com/#about). The cream-violet palette draws from [Tongtong Jin’s website](https://tongtongjin.art/). See [design notes](docs/DESIGN.md), [asset credits](docs/ASSETS.md), and the site’s `/credits.html` page.

Code and text may be maintained here; photographs, project identities, research figures, and third-party assets retain their respective rights. This repository does not grant permission to reuse personal photographs.

The private content-review checklist is maintained outside this public repository.

## Workspace organization

The containing `personal-website/` directory holds `main/` (this repository) and `themes/{pink,green,blue,terracotta}/` (Git worktrees). Each preview branch changes only `src/theme-default.ts` and the initial HTML theme. Source content and layout are identical. Run Git commands from `main/`, or use `git -C main …` from the containing directory.
