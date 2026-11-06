// Quick sanity check for src/data/*.json. Run: npm run check
// Catches broken JSON and text that has English but forgot Thai (or the reverse).
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve(import.meta.dirname, '../src/data');
let problems = 0;

function walk(value, where) {
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${where}[${i}]`));
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    const isText = keys.includes('en') || keys.includes('th');
    if (isText) {
      for (const k of ['en', 'th']) {
        if (typeof value[k] !== 'string' || !value[k].trim()) {
          console.error(`  ✗ ${where}: missing "${k}" text`);
          problems++;
        }
      }
      return;
    }
    for (const k of keys) walk(value[k], `${where}.${k}`);
  }
}

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  try {
    walk(JSON.parse(readFileSync(resolve(dir, file), 'utf8')), file);
  } catch (e) {
    console.error(`  ✗ ${file}: not valid JSON (${e.message})`);
    problems++;
  }
}

if (problems) {
  console.error(`\n${problems} problem(s) in src/data. Fix them before deploying.`);
  process.exit(1);
}
console.log('✓ src/data looks good');
