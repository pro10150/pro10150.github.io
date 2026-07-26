# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                                  # dev server on http://localhost:3000
npm run build                              # production build to build/
npm test                                   # interactive watch mode
CI=true npm test                           # single non-watch run
CI=true npm test -- --testPathPattern=App  # run one test file
npm run deploy                             # predeploy runs build, then gh-pages -d build
```

Create React App (`react-scripts` 5). No lint script — ESLint runs through `react-scripts` via the `eslintConfig` field in `package.json`.

Deploy target is `https://github.com/pro10150/pro10150.github.io`, a GitHub *user* page fronted by the custom domain `www.noppakunanantakitthawon.com` (apex 301s to www; cert covers both). `homepage` in `package.json` is set to `https://www.noppakunanantakitthawon.com` and `public/CNAME` holds the same host — CRA copies `public/` into every build, so `public/CNAME` **must** survive each `gh-pages -d build` publish or the custom domain drops (this has happened before: `gh-pages` branch history shows a publish deleting `CNAME`, manually restored two commits later).

## Architecture

Single-page app, no router. `src/index.js` → `src/App.js` renders only `<NavigationBar />` inside `NextUIProvider`. (`App.js` also imports `Home` without using it — `Home` is rendered by `NavigationBar`.)

Content flows through three layers:

1. **`src/models/*Model.js`** — static arrays of plain objects. This is the only content source; there is no database or API despite `mongoose`/`axios` being in `package.json`.
2. **`src/components/List/<X>.js`** — renders one array element; receives that element's fields spread as props.
3. **`src/components/<Section>.js`** — pairs a model with its row component via `ListTemplate`.

`src/components/List/ListTemplate.js` is the generic renderer that ties them together:

```jsx
<ListTemplate component={ExperienceWork} data={ExperienceWorkModel} sectionTitle="Work Experience" />
```

It maps `data` and does `<Component {...dataItem} />`. A section may use several `ListTemplate`s (see `Experience.js`).

**Updating portfolio content (jobs, courses, schools, projects) means editing a model file only** — no component change required, as long as the field names match what the row component destructures.

`src/components/NavigationBar.js` owns both the nav and the page body: it lists every `<section id="...">` and the `react-scroll` `<Link to="...">` that scrolls to it. A new section requires an entry in both lists in that one file, and the `to` value must match the `id`.

## Conventions and gotchas

- **Model exports are inconsistent.** All models use a named export (`export const XModel = [...]`) except `ExperiencePastProjectModel.js`, which has both a named *and* a default export — and `Experience.js` imports it as the default. Follow the named-export pattern for new models.
- **Styling is 390 lines of global CSS classes in `src/App.css`** (`section-detail`, `detail-body`, `name-body`, `year-header`, `hStackContainer`, …). `tailwindcss` is a devDependency, but its config sits at `src/config/tailwind.config.js` rather than the repo root and no CSS file contains `@tailwind` directives, so Tailwind is not part of the build. Bootstrap CSS is imported globally in `App.js`.
- **UI libraries are barely used.** NextUI provides only the top-level provider; `@mui/material` is used in exactly one place (`Chip` in `List/ExperiencePastProject.js`). `framer-motion` and `@fontsource/inter` have no imports in `src/`.
- **`src/App.test.js` is the untouched CRA default** asserting `/learn react/i`, while `App.js` renders only `NavigationBar`, which contains no such text.
- **Shared helpers** (prefer these over reimplementing): `src/utils/Date.js` — `calculateDateDifference(start, end)` returning `{years, months}`; `src/utils/Github.js` — `getRepoNameFromUrl(url)` returning `{username, repoName}` or `null`. Date formatting uses `date-fns` `format`. Row components handle an absent `endDate` as "ongoing" (see `List/ExperienceWork.js`).
