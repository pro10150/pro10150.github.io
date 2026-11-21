// Card ⇄ overlay flip. The card turns edge-on, then the overlay turns in from
// the card's spot while growing to full size. Close plays it backwards.
const P = 'perspective(1200px)';
export const reduceMotion = () =>
  typeof window === 'undefined' || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const cardFor = (slug) => document.querySelector(`button[data-slug="${slug}"]`)?.closest('article');

const base = (el) => {
  const t = getComputedStyle(el).transform;
  return t && t !== 'none' ? t : '';
};

// Card: face → edge-on (deg 90) or edge-on → face (reverse).
export function turnCard(el, reverse = false) {
  if (!el || !el.animate || reduceMotion()) return Promise.resolve();
  const b = base(el);
  const frames = [{ transform: `${P} ${b} rotateY(0deg)` }, { transform: `${P} ${b} rotateY(90deg)` }];
  return el.animate(reverse ? frames.reverse() : frames, {
    duration: 170, easing: reverse ? 'cubic-bezier(.2,.8,.3,1)' : 'cubic-bezier(.6,0,.9,.4)',
  }).finished.catch(() => {});
}

// Overlay: from the card's box, edge-on → full size, facing us (or reverse).
export function turnDialog(dlg, card, reverse = false) {
  if (!dlg || !card || !dlg.animate || reduceMotion()) return Promise.resolve();
  const a = card.getBoundingClientRect();
  const b = dlg.getBoundingClientRect();
  if (!a.width || !b.width) return Promise.resolve();
  const dx = a.left + a.width / 2 - (b.left + b.width / 2);
  const dy = a.top + a.height / 2 - (b.top + b.height / 2);
  const from = { transform: `translate(${dx}px, ${dy}px) ${P} scale(${a.width / b.width}, ${a.height / b.height}) rotateY(-90deg)` };
  const to = { transform: `translate(0, 0) ${P} scale(1, 1) rotateY(0deg)` };
  return dlg.animate(reverse ? [to, from] : [from, to], {
    duration: reverse ? 240 : 420,
    easing: reverse ? 'cubic-bezier(.5,0,.9,.5)' : 'cubic-bezier(.15,.85,.25,1.08)',
    fill: 'forwards',
  }).finished.catch(() => {});
}
