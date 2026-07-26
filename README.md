# Portfolio

Source for [www.noppakunanantakitthawon.com](https://www.noppakunanantakitthawon.com) — personal portfolio site.

## Stack

Create React App (`react-scripts` 5) + React 18, single-page scroll layout using `react-bootstrap` and `react-scroll`. Deployed to GitHub Pages via `gh-pages`.

## Run

```bash
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build to build/
```

## Deploy

```bash
npm run deploy   # predeploy runs build, then gh-pages -d build
```

## Content

Portfolio content (jobs, courses, schools, projects) lives in `src/models/*Model.js` as plain data arrays, rendered through `src/components/List/ListTemplate.js`. Updating content is a model-file edit — no component changes needed as long as field names match.
