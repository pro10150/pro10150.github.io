import { Rich, T, pick, useLang } from '../i18n';

export default function Card({ item }) {
  const lang = useLang();
  const classes = ['card'];
  if (item.theme) classes.push(item.theme);
  if (item.featured) classes.push('feature');
  return (
    <article className={classes.join(' ')}>
      {item.emoji && <div className="sticker" aria-hidden="true">{item.emoji}</div>}
      <h3><T v={item.title} /></h3>
      {item.role && <div className="role"><T v={item.role} /></div>}
      {item.when && <div className="when"><T v={item.when} /></div>}
      <p><Rich text={item.description} hlClass="mark" /></p>
      {item.bullets && (
        <ul>{item.bullets.map((b, i) => <li key={i}><T v={b} /></li>)}</ul>
      )}
      {item.tags && (
        <div className="tags">{item.tags.map((t, i) => <span key={i}>{pick(t, lang)}</span>)}</div>
      )}
      {(item.status || item.link) && (
        <div className="foot">
          {item.status && <span className={`badge ${item.status.type || ''}`}><T v={item.status.label} /></span>}
          {item.link && (
            <a className="more" href={item.link.url} target="_blank" rel="noopener noreferrer"><T v={item.link.label} /></a>
          )}
        </div>
      )}
    </article>
  );
}
