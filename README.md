# Archived color studies · 历史配色归档

This `archive/themes` branch preserves the earlier five-color exploration of Zihan Wang’s personal homepage. It is a historical snapshot, with older content and a five-theme picker. The default is rose pink. It is not the current homepage or a production deployment source.

当前主页请使用 [main（绿色）](https://github.com/wangzh12023/personal-website/tree/main)；紫色版本位于 [theme/violet](https://github.com/wangzh12023/personal-website/tree/theme/violet)。此分支仅保留旧配色与历史代码，文字、项目资料和界面可能落后于当前版本。

## What is retained

The snapshot includes rose pink, cream violet, sage green, slate blue, and warm terracotta. The older preview branches are preserved through merge ancestry; their commits remain reachable from this archive even after separate preview branches are retired. The historical variants can be inspected through the picker or `?theme=pink`, `?theme=violet`, `?theme=green`, `?theme=blue`, and `?theme=terracotta`.

An explicit theme query takes precedence over a saved browser preference. For the archive’s default rose appearance, open `?theme=pink`. English is the default; `?lang=zh` opens the archived Chinese copy.

## Run the archive when needed

```sh
npm ci
npm run dev -- --port 5180 --strictPort
npm run check
npm run build
```

Port `5180` is an example; choose a free port. This archive has no dedicated always-on preview. Current green and violet previews use ports `5173` and `5174` in their own worktrees.

## Historical references and rights

The academic layout was independently implemented with reference to [Long Ling’s homepage](https://long-ling.com/#about); the violet study drew from [Tongtong Jin’s website](https://tongtongjin.art/). The archived [design notes](docs/DESIGN.md), [language behavior](docs/I18N.md), [asset credits](docs/ASSETS.md), and `/credits.html` describe this older snapshot.

Original application documents and private review materials remain excluded. Photographs, research figures, project identities, fonts, icons, and third-party assets retain their respective rights. This archive does not grant permission to reuse personal photographs.
