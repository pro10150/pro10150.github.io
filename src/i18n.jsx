import { createContext, useContext, Fragment } from 'react';

export const LangContext = createContext('en');
export const useLang = () => useContext(LangContext);

// A value in the JSON files is either a plain string (same in both languages)
// or an object like { "en": "...", "th": "..." }.
export function pick(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  return value[lang] ?? value.en ?? '';
}

// Tiny markup for JSON text: **bold**, ==highlight==, and line breaks (\n).
export function Rich({ text, hlClass = 'hl' }) {
  const lang = useLang();
  const str = pick(text, lang);
  const parts = str.split(/(\*\*[^*]+\*\*|==[^=]+==|\n)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part === '\n') return <br key={i} />;
    if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>;
    if (part.startsWith('==')) return <span key={i} className={hlClass}>{part.slice(2, -2)}</span>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function T({ v }) {
  return pick(v, useLang());
}
