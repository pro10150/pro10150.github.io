// Renders the React app to static HTML for / and /th/ after the build,
// so search engines and link previews see real content without running JS.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

for (const [lang, file] of [['en', 'dist/index.html'], ['th', 'dist/th/index.html']]) {
  const path = resolve(root, file);
  const html = readFileSync(path, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`No <!--app--> placeholder in ${file}`);
  writeFileSync(path, html.replace('<!--app-->', render(lang)));
  console.log(`prerendered ${file}`);
}
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true });
