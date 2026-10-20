# Design notes

The homepage independently recreates the compact academic layout observed at [Long Ling’s website](https://long-ling.com/#about): a fixed header, a profile column on desktop, small sans-serif body text, Sigmar One section labels, horizontal project rows, dashed dividers, and timeline cards. On narrower screens, the profile and content stack. The older [LucyLing24 repository](https://github.com/LucyLing24/lucyling-portfolio) represents a different site and was not used as the application codebase.

## Current versions

The `main` branch is the green version, previewed on port `5173`. The `theme/violet` branch is the violet version, previewed on port `5174`. They share content, layout, project images, and interactions. Colors are maintained by branch; there is no visitor-facing color picker in these current versions.

The violet treatment draws from [Tongtong Jin’s website](https://tongtongjin.art/), including its violet accents and light surfaces. The green treatment keeps the same visual structure. Shared multicolor tags and semantic accents provide variety without turning every element into the theme color. The active values live in `src/styles.css`; the branch default is in `src/theme-default.ts` and the initial document theme in `index.html`.

Earlier pink, green, violet, slate-blue, and terracotta comparisons are retained in [archive/themes](https://github.com/wangzh12023/personal-website/tree/archive/themes). That branch preserves historical content and its five-theme picker, with pink as the archive default. It is not a third actively maintained visual version.

## Content and presentation

Research is presented as research experience, without publication or acceptance claims. English research titles, tags, and method names remain in English in the Chinese view; Chinese connects the technical description without inventing translated terminology. Project details distinguish original projects, collaborations, and upstream contributions.

Experience entries use real organization marks or identifiable official images. Education uses the original university emblem-and-name SVG from the ShanghaiTech University homepage. The SIST school-name image is recorded separately and is not substituted for the university mark. The MARS image is an official laboratory-tour photograph, not an invented lab logo. Contribution links identify the author’s work independently of an upstream project’s popularity.

The standalone `/cv.html` page uses the branch’s accent with serif headings and A4 print styles. Its contact block contains email addresses and a GitHub profile. The CV and credits page support both languages.

## Fonts, icons, and media

Sigmar One is locally hosted under the SIL Open Font License, included at `public/assets/fonts/OFL-Sigmar-One.txt`. Body text uses a system sans-serif stack. General interface icons use Lucide; the GitHub mark uses Octicons; Xiaohongshu and Bilibili marks use Simple Icons. Their license texts are retained beside the SVGs. Brand icons retain their recognizable official shapes.

The portrait is supplied by Zihan Wang. Research figures are extracted from supplied materials; project imagery comes from the corresponding repositories or public demos. Photography comes from the author’s verified 500px account. Full asset and organization sources appear in [ASSETS.md](ASSETS.md) and `/credits.html`. The reference authors’ portraits and prose are not reused. Reduced-motion preferences disable decorative motion.
