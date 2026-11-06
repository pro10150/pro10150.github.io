import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const site = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Builds the <head> for each language from src/data/site.json,
// so SEO text is edited in JSON like everything else.
function head(lang) {
  const base = site.url.replace(/\/$/, '');
  const url = lang === 'th' ? `${base}/th/` : `${base}/`;
  const title = esc(site.seo.title[lang]);
  const desc = esc(site.seo.description[lang]);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: [site.nickname.en, site.nickname.th],
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    url: `${base}/`,
    image: `${base}/og-image.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
    alumniOf: "King Mongkut's University of Technology Thonburi",
    sameAs: [site.linkedin, site.github, site.freelanceUrl].filter(Boolean),
  };
  return `<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <meta name="author" content="${esc(site.name)}" />
    <meta name="theme-color" content="#121834" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${base}/" />
    <link rel="alternate" hreflang="th" href="${base}/th/" />
    <link rel="alternate" hreflang="x-default" href="${base}/" />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="${lang === 'th' ? 'th_TH' : 'en_US'}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${base}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/appleTouchIcon.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700${lang === 'th' ? '&family=Noto+Sans+Thai:wght@400;500;600;700;800;900' : ''}&display=swap" />
    <script>try{var t=localStorage.getItem('por-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
    <script type="application/ld+json">${JSON.stringify(person)}</script>`;
}

const seoHead = {
  name: 'seo-head',
  transformIndexHtml(html) {
    return html.replace('<!--head:en-->', head('en')).replace('<!--head:th-->', head('th'));
  },
};

export default defineConfig({
  plugins: [react(), seoHead],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        th: resolve(import.meta.dirname, 'th/index.html'),
      },
    },
  },
});
