import { useEffect, useRef } from 'react';
import { Rich, T, useLang, pick } from '../i18n';
import ui from '../data/ui.json';
import { turnDialog } from '../flip';

// Overlay for a side-project card. Only rendered for items that have `details`.
export default function ProjectDialog({ item, from, onClose }) {
  const lang = useLang();
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    if (from) turnDialog(d, from);
    document.documentElement.classList.add('modal-open');
    return () => document.documentElement.classList.remove('modal-open');
  }, []);

  // Close plays the flip backwards into the card, then unmounts.
  const closing = useRef(false);
  const requestClose = async () => {
    if (closing.current) return;
    closing.current = true;
    if (from) {
      ref.current?.classList.add('leaving');
      await turnDialog(ref.current, from, true);
    }
    onClose();
  };

  const { details } = item;
  const links = item.links || (item.link ? [item.link] : []);
  return (
    <dialog
      ref={ref}
      className={`pd ${item.theme || ''}${from ? ' flip' : ''}`}
      aria-labelledby="pd-title"
      onCancel={(e) => { e.preventDefault(); requestClose(); }}
      onClick={(e) => { if (e.target === ref.current) requestClose(); }}
    >
      <div className="pd-body" tabIndex={-1} autoFocus>
        <button className="pd-x" type="button" onClick={requestClose} aria-label={pick(ui.details.close, lang)}>✕</button>
        <div className="pd-head">
          {item.emoji && <span className="pd-emoji" aria-hidden="true">{item.emoji}</span>}
          <div>
            <h3 id="pd-title"><T v={item.title} /></h3>
            {item.role && <div className="role"><T v={item.role} /></div>}
          </div>
        </div>
        {item.status && <span className={`badge ${item.status.type || ''}`}><T v={item.status.label} /></span>}

        <h4><T v={ui.details.what} /></h4>
        {details.what.map((p, i) => <p key={i}><Rich text={p} hlClass="mark" /></p>)}

        {details.timeline && (
          <>
            <h4><T v={ui.details.timeline} /></h4>
            <ol className="pd-tl">
              {details.timeline.map((s, i) => (
                <li key={i} className={s.when ? '' : 'undated'}>
                  {s.when && <b><T v={s.when} /></b>}
                  <span><Rich text={s.text} hlClass="mark" /></span>
                </li>
              ))}
            </ol>
          </>
        )}

        {links.length > 0 && (
          <div className="foot">
            {links.map((l, i) => (
              <a key={i} className="more" href={l.url} target="_blank" rel="noopener noreferrer"><T v={l.label} /></a>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
