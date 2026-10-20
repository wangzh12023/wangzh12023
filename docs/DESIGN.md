# Design notes

The homepage independently recreates the compact academic layout observed at [Long Ling’s website](https://long-ling.com/#about): a fixed header, a profile column on desktop, small sans-serif body text, Pacifico section labels, horizontal project rows, dashed dividers, and timeline cards. On narrower screens, the profile and content stack. The older [LucyLing24 repository](https://github.com/LucyLing24/lucyling-portfolio) represents a different site and was not used as the application codebase.

## Current versions

The `main` branch is the green version, previewed on port `5173`. The `theme/violet` branch is the violet version, previewed on port `5174`. The green version currently includes local typography, atmosphere, and athletics refinements; violet retains its earlier presentation. Colors are maintained by branch; there is no visitor-facing color picker in these current versions.

The violet treatment draws from [Tongtong Jin’s website](https://tongtongjin.art/), including its violet accents and light surfaces. The green treatment keeps the same visual structure. Shared multicolor tags and semantic accents provide variety without turning every element into the theme color. The active values live in `src/styles.css`; the branch default is in `src/theme-default.ts` and the initial document theme in `index.html`.

Earlier pink, green, violet, slate-blue, and terracotta comparisons are retained in [archive/themes](https://github.com/wangzh12023/personal-website/tree/archive/themes). That branch preserves historical content and its five-theme picker, with pink as the archive default. It is not a third actively maintained visual version.

## Local green palette study

Open `http://localhost:5173/palette-review.html` to compare Jade, Sage, Mint, Olive, Pine, and Goblin on the current homepage. The review page provides swatches, full-page links, and an embedded preview with a diffuse-background toggle. It is a Vite development entry only and is not included in the production build or linked from the homepage.

`src/palettes.ts` defines the six palettes. `?palette=jade|sage|mint|olive|pine|goblin` selects one without storing a visitor preference; Jade is the default. `&atmosphere=off` hides the diffuse background for comparison. Language changes preserve these parameters. `src/atmosphere.css` keeps the atmospheric backdrop fixed behind the profile while content scrolls. The navigation is transparent, with a softly fading blur veil for legibility and no hard bottom border. Three separate, blurred radial color pools sit at different heights across the top, leaving irregular white space between them and fading independently into a white lower viewport. They share one continuous background across both columns. The profile sits slightly higher with a modestly smaller portrait. Small tags keep their existing styles. The treatment is static and uses CSS gradients without new image assets.

## Content and presentation

Research is presented as research experience, without publication or acceptance claims. English research titles, tags, and method names remain in English in the Chinese view; Chinese connects the technical description without inventing translated terminology. Project details distinguish original projects, collaborations, and upstream contributions.

Experience entries use real organization marks or identifiable official images. Education uses the original university emblem-and-name SVG from the ShanghaiTech University homepage. A left-hand timeline connects the education entries, with a hollow node for the incoming Ph.D. and a filled node for the undergraduate period; dates remain outside the cards. The SIST school-name image is recorded separately and is not substituted for the university mark. The MARS image is an official laboratory-tour photograph, not an invented lab logo. Contribution links identify the author’s work independently of an upstream project’s popularity.

The standalone `/cv.html` page uses the branch’s accent with serif headings and A4 print styles. Its contact block contains email addresses and a GitHub profile. The CV and credits page support both languages.

## Fonts, icons, and media

Pacifico is locally hosted under the SIL Open Font License, included at `public/assets/fonts/OFL-Pacifico.txt`. Body text uses a system sans-serif stack. General interface icons use Lucide; the GitHub mark uses Octicons; Xiaohongshu and Bilibili marks use Simple Icons. Their license texts are retained beside the SVGs. Brand icons retain their recognizable official shapes.

The portrait is supplied by Zihan Wang. Research figures are extracted from supplied materials; project imagery comes from the corresponding repositories or public demos. Photography comes from the author’s verified 500px account. Full asset and organization sources appear in [ASSETS.md](ASSETS.md) and `/credits.html`. The reference authors’ portraits and prose are not reused. Reduced-motion preferences disable decorative motion.

## Personal interests

Photography and Running & Athletics are sibling subsections. The photographer identity is normal body text rather than a low-contrast credit. The athletics presentation takes inspiration from the proportion of interests on [Jon Eisen’s personal site](https://joneisen.me/) and the simple distance–result pairs on [Tanis Bolton’s site](https://tanissmith.com/): one event photograph and result, five unboxed personal-best values ordered by distance, small race photographs with medals beneath, and a volunteer row. It does not compete with the research and project sections for prominence. On phones, the gallery reflows and the three race images stay within their matching record columns.

The profile portrait is an unadorned transparent photographic cutout. Responsive CSS scales it and softly fades its shirt edge into the page. The full owner-supplied goblin artwork sits beside the name in the header. A brief gold-white glint is masked to its crown on entry and hover/focus; reduced-motion preferences disable it. Open-source contributions share compact cards, with the original Hands-on Modern RL artwork cropped to its left wordmark.

## Typography, motion, and athletics review

Pacifico replaces the former Sigmar One treatment in the brand, section headings, and profile actions, with a handwritten CJK fallback for Chinese display text. Body copy keeps the system sans-serif stack. Anchor scrolling uses a cancellable eased transition, with gentle heading arrivals and a spring-like goblin greeting; reduced-motion settings disable the decorative animation.

Athletics follows an open editorial composition: one distance axis contains 400 m, 800 m, 1,000 m, 1,500 m, and the half marathon. Small race images sit under the 400 m and 1,500 m results, with their silver/gold SVG medals below; the half marathon keeps its event logo and Chongming Island location without a medal. The 800 m PB is 2:20; relay and high jump are omitted. PB / Track labels and the distance caption are omitted. The image/typography balance takes inspiration from [MOUTHWASH Studio’s Literary Sport](https://mouthwash.studio/project/literary-sport/), without reusing its artwork or copy.


## Final interface details

Resource links use solid violet, blue, rose, and ochre pills with white text. Both Upcoming labels share the same flowing purple gradient; photography links and existing rainbow badges also animate their gradients. Reduced-motion settings use solid fills for those multicolor labels. News places ObjectTalk second. The Star-Team date reads 2026 in both languages, and the footer contains only copyright and the author name.
