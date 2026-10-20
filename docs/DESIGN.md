# Archived design notes

This document describes the historical `archive/themes` snapshot. The archive retains the earlier five-color picker, with rose pink as its default; its content and interface are not the current homepage. Current versions are [main (green)](https://github.com/wangzh12023/personal-website/tree/main) and [theme/violet](https://github.com/wangzh12023/personal-website/tree/theme/violet).

The archived homepage independently recreates the compact academic layout observed at [Long Ling’s website](https://long-ling.com/#about): a 56 px fixed header, a centered fixed profile column on desktop, small sans-serif body text, chunky Sigmar One section labels, horizontal project rows, dashed dividers, and quiet timeline cards. Below 1000 px, the profile and content stack. Reference screenshots and measurements are kept in `research/`; they are not public website assets. The older [LucyLing24 repository](https://github.com/LucyLing24/lucyling-portfolio) represents a different site and was not used as the application codebase.

The violet treatment draws from [Tongtong Jin’s website](https://tongtongjin.art/): warm cream `#FAF9F6`, violet `#7C3AED`, hover `#6D28D9`, and pale purple surfaces. The homepage keeps a shared white page to make the five variants directly comparable. Green is an original companion palette. Content, layout, images, semantic badges, and rainbow labels stay the same across variants.

## Implemented theme tokens

These values match `src/styles.css`. Header values include an alpha channel (`E8` ≈ 91% opacity).

| Token | Violet | Pink | Green |
|---|---|---|---|
| Primary accent | `#7C3AED` | `#F42E7A` | `#2D795F` |
| Accent hover | `#6D28D9` | `#D91C64` | `#1D5D46` |
| Secondary accent | `#C4B5FD` | `#FF9CB7` | `#91BDA6` |
| Soft surface | `#FAF5FF` | `#FFF6F8` | `#F2F8F3` |
| Accent border | `#E9D5FF` | `#FFBED2` | `#C9DFCE` |
| Header surface | `#FAF9F6E8` | `#FFF6F8E8` | `#F5F8F2E8` |
| Page | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Main ink | `#242424` | `#242424` | `#242424` |
| Muted ink | `#888888` | `#888888` | `#888888` |

Shared semantic colors: research `#C4B5FD`; project `#9AD6DF` with `#20525B` text; award `#FFF2CE` with `#9C710B` text; community `#D9ECC8` with `#4B6931` text; tools `#C5D2EE` with `#3A5082` text. Selected-work and research labels use a shared animated thirteen-stop pastel spectrum. Secondary tags use lavender, cyan, blue, and green surfaces across all themes. Motion is disabled when reduced motion is requested.

The archived public CV at `/cv.html` uses a rose-pink accent and Georgia serif headings, with a dedicated two-page A4 print layout. Its contact block contains the two supplied email addresses and GitHub profile. Academic research appears under Research Experience without publication or acceptance claims.

## Fonts and assets

Sigmar One is locally hosted under the SIL Open Font License; see `public/assets/fonts/OFL-Sigmar-One.txt`. Body text uses the system sans-serif stack. The portrait is supplied by Zihan Wang. Project imagery comes from the corresponding project repositories or supplied material; provenance is recorded in `research/project-assets.json`. The reference authors’ portraits and prose are not reused.

Two additional historical theme-only comparisons are retained: slate blue (`#396A96`, soft `#F3F7FB`) and warm terracotta (`#AA6145`, soft `#FCF5EF`). General-purpose icons are official Lucide SVGs, sharing one line style across the profile, awards, controls, and annotations.
