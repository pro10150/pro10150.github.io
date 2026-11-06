# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server, http://localhost:5173 (Thai page at /th/)
npm run check     # validate src/data/*.json (parse + every {en,th} pair complete)
npm run build     # client build + SSR build + prerender into dist/
npm run preview   # serve dist/
npm run deploy    # manual publish: check, build, gh-pages -d dist
```

Deploys normally happen in GitHub Actions (`.github/workflows/deploy.yml`): every push to `main` runs check + build and publishes `dist/` to the `gh-pages` branch. PRs run check + build only.

Deploy target is the `gh-pages` branch of `pro10150/pro10150.github.io`, a GitHub *user* page behind `www.noppakunanantakitthawon.com`. `public/CNAME` is copied into every build and the workflow also passes `cname:`; **the CNAME must survive every publish** or the custom domain drops (this has happened before).

## Architecture

React 18 + Vite 6, two HTML entry points (`index.html` = English, `th/index.html` = Thai). Language comes from `<html lang>`; there is no router. The nav's language button is a plain link between `/` and `/th/`.

- `vite.config.js` — `seo-head` plugin fills `<!--head:en-->` / `<!--head:th-->` with title, description, canonical, hreflang, Open Graph and Person JSON-LD, all read from `src/data/site.json`. It also inlines the theme-restore script (localStorage `por-theme`).
- `scripts/prerender.mjs` — after the SSR build of `src/entry-server.jsx`, renders `<App lang>` to a string and replaces `<!--app-->` in `dist/index.html` and `dist/th/index.html`. `src/main.jsx` hydrates when markup is present.
- `src/App.jsx` — every section (Nav, Hero, Stats, Work, Side, Story, About, Education, Contact). `src/components/Card.jsx` renders both project grids; `SectionHead.jsx` renders chapter label + heading + subtitle.
- `src/i18n.jsx` — `pick(value, lang)` resolves a JSON value that is either a string or `{en, th}`; `<Rich>` supports `**bold**`, `==highlight==` and `\n` inside JSON text; `<T v>` is the plain version.
- `src/styles.css` — all styling. Theme via `html[data-theme=dark|light]` CSS variables; Thai tweaks via `html[lang=th]`.

**Content lives only in `src/data/*.json`.** Adding a job, project, cert or skill should never need a component change. If a new field is needed, add it to the component *and* document it in README.md's "Updating the site" table.

## Conventions and gotchas

- Every user-facing string goes in JSON with both `en` and `th`, unless it's identical in both (tech names, company names). `npm run check` fails on a half-filled pair.
- Thai copy voice: a capable dev who's fun to talk to, not formal; English tech words (scope, pitch, commit, CI, branch) are fine. Write it fresh, don't translate word for word. Por = ปอ.
- Coral (`.card.jernie`) is reserved for the Jernie card. Palette otherwise: navy #2B3467, sky #BAD7E9, cream #FCFFE7, pink #EB455F, highlight #FFE14D.
- Selectors for chips/tags use `>` (`.tags>span`, `.roles>span`) on purpose; nested spans from `<Rich>` must not pick up chip styles.
- Design reference (approved Nov 2026): Claude artifact "Por — Portfolio Design Reference".
