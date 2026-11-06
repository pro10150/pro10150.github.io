# noppakunanantakitthawon.com

Por's portfolio. English at `/`, Thai at `/th/`. React + Vite, prerendered to static HTML so Google sees the real content.

## Updating the site (no code needed)

All content lives in **`src/data/`**. Edit a JSON file, push to `main`, and GitHub Actions rebuilds and deploys the site in about a minute.

| File | What's in it |
| --- | --- |
| `site.json` | Name, email, links (LinkedIn, GitHub, Fastwork), résumé path, open-to-work / freelance switches, SEO title + description |
| `hero.json` | Top of the page: greeting, tagline, intro, role chips, freelance note |
| `stats.json` | The 4 number tiles |
| `work.json` | Client project cards (Chapter 02) |
| `side-projects.json` | Personal project cards (Chapter 03) |
| `experience.json` | Job timeline (Chapter 04) |
| `about.json` | About paragraphs + the "Inventory" box |
| `skills.json` | Skill groups and tags |
| `education.json` | Schools and programs |
| `awards.json` | Awards (the yellow banner) |
| `certificates.json` | Certificate tiles |
| `earlier-projects.json` | School projects with GitHub links |
| `ui.json` | Nav labels, button text, section headings, footer |

### Text rules

- Text that's the same in both languages: a plain string, `"Swift"`.
- Text that differs: `{ "en": "...", "th": "..." }`.
- Inside text: `**bold**`, `==yellow highlight==`, and `\n` for a line break.

### Common edits

**New job** — add an object at the top of `experience.json`:

```json
{
  "title": "Senior iOS Developer",
  "company": "Some Company",
  "meta": { "en": "Bangkok · Jan 2027 – now", "th": "กรุงเทพฯ · ม.ค. 2027 – ปัจจุบัน" },
  "projects": [
    { "when": { "en": "Jan 2027 – now", "th": "ม.ค. 2027 – ปัจจุบัน" }, "name": "App name", "note": { "en": "What I did", "th": "ทำอะไร" } }
  ]
}
```

Add `"past": true` to older jobs to give their dot the light-blue color.

**New project card** — copy any object in `work.json` or `side-projects.json`. Optional fields: `emoji`, `bullets`, `link`, `featured: true` (2 columns wide), `theme: "jernie"` (coral card).

Status badge `type`: `live` (green), `pending` (yellow), `dev` (blue).

**Jernie goes live** — in `side-projects.json`, change its `status` to:

```json
{ "type": "live", "label": { "en": "✅ Live on App Store", "th": "✅ อยู่บน App Store แล้ว" } }
```

**New résumé** — drop the PDF in `public/files/` and point `resume` in `site.json` at it.

**Stop taking freelance work** — set `"openToFreelance": false` in `site.json`; the chip text lives in `hero.json`.

### Check before you push

```bash
npm run check   # finds broken JSON and missing Thai/English text
```

GitHub Actions runs the same check and won't deploy if it fails.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173 (Thai: /th/)
npm run build     # static site in dist/
npm run preview   # serve dist/
```

## Deploying

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to the `gh-pages` branch. `npm run deploy` still works for a manual publish from your machine.

The custom domain comes from `public/CNAME`. **When the domain changes:** update `public/CNAME`, `url` in `site.json`, the URLs in `public/sitemap.xml` and `public/robots.txt`, and `cname` in the workflow. Keep the old domain for about a year and redirect it to the new one so search ranking carries over.
