> Website source now lives in `wangzh12023/wangzh12023`. The root `README.md` is the existing GitHub profile and must be preserved. Website development notes live here instead.

# Zihan Wang · 王子涵

A bilingual personal homepage for research, projects, open-source contributions, teaching, and photography. English is the default; `?lang=zh` opens the Chinese version.

## Versions

| Branch | Purpose | Local preview |
| --- | --- | --- |
| [main](https://github.com/wangzh12023/wangzh12023/tree/main) | Green homepage and production source | [localhost:5173](http://localhost:5173/?lang=en) |
| [theme/violet](https://github.com/wangzh12023/wangzh12023/tree/theme/violet) | Violet version | [localhost:5174](http://localhost:5174/?lang=en) |
| [archive/themes](https://github.com/wangzh12023/wangzh12023/tree/archive/themes) | Historical color studies and their Git history | Start manually when needed |

The green version currently includes local typography, atmosphere, and athletics refinements; violet retains its previous presentation. Review six green palettes at [localhost:5173/palette-review.html](http://localhost:5173/palette-review.html); this review entry is not part of the production build. The archive retains the earlier five-theme picker and older content; it is not a current homepage or a production deployment source.

## Local development

```sh
npm ci
npm run dev -- --port 5173 --strictPort
npm run check
npm run build
npm run preview
```

For the violet worktree, use port `5174`. Language selection is explicit: the site does not switch based on the browser language.

## Editing content

- `src/data.ts`: English research and project records, links, media, and detail copy.
- `src/data-zh.ts`: Chinese project copy keyed by stable project IDs; research titles and technical terms retain their English names.
- `src/i18n.ts`: Shared UI and homepage translations.
- `src/main.ts`: Page rendering and interactions.
- `src/styles.css`: Layout and color variables.
- `src/theme-default.ts`: Branch color default.
- `public/cv.html`: Bilingual CV with print / PDF styles.
- `public/assets/`: Locally hosted portrait, research figures, project media, organization images, icons, and portfolio photographs.

Both languages use the same images, links, project IDs, and underlying facts. A language switch keeps the current section, project filter, and open project detail. Detail hashes such as `#work/objecttalk` can be shared directly.

## Hosting

The public homepage is [zihan-wang-portfolio.vercel.app](https://zihan-wang-portfolio.vercel.app/). The app builds to `dist/` and has no backend or runtime secrets. `vercel.json` provides the Vite build configuration; GitHub Actions checks production builds. Vercel uses `main` as its production branch.

Original application documents, internal research notes, and the private content-review checklist are excluded from version control and deployment. The public CV contains professional contact details only.

## Design and asset credits

The academic layout is independently implemented with reference to [Long Ling’s homepage](https://long-ling.com/#about). The violet palette draws from [Tongtong Jin’s website](https://tongtongjin.art/); green is the main color treatment. See [design notes](docs/DESIGN.md), [asset credits](docs/ASSETS.md), and the site’s `/credits.html` page.

Locally hosted icons include Lucide (ISC / MIT), GitHub Octicons (MIT), and Simple Icons (CC0). The relevant license texts accompany the assets. Organization marks identify their respective institutions and projects. Photographs, research figures, project identities, and other third-party assets retain their respective rights; this repository does not grant permission to reuse personal photographs.

## Workspace organization

The containing workspace holds `main/` (this repository), `themes/violet/` (the violet worktree), and `archive/themes/` (the historical archive worktree). Run Git commands from the relevant checkout, or use `git -C main …` from the containing directory. Use `git worktree list` to inspect the current local setup.
