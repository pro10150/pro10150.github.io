import { renderToString } from 'react-dom/server';
import App from './App';
import site from './data/site.json';

export const seo = site.seo;
export function render(lang) {
  return renderToString(<App lang={lang} />);
}
