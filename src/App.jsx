import { useEffect, useState } from 'react';
import { LangContext, Rich, T, pick } from './i18n';
import Card from './components/Card';
import SectionHead from './components/SectionHead';

import site from './data/site.json';
import hero from './data/hero.json';
import stats from './data/stats.json';
import work from './data/work.json';
import sideProjects from './data/side-projects.json';
import experience from './data/experience.json';
import about from './data/about.json';
import skills from './data/skills.json';
import education from './data/education.json';
import awards from './data/awards.json';
import certificates from './data/certificates.json';
import earlierProjects from './data/earlier-projects.json';
import ui from './data/ui.json';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function ThemeToggle({ lang }) {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }, []);
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('por-theme', next); } catch (e) { /* storage blocked */ }
    setTheme(next);
  };
  return (
    <button className="toggle" type="button" onClick={flip} aria-label={pick(ui.nav.themeLabel, lang)}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

function Nav({ lang }) {
  const other = lang === 'en' ? '/th/' : '/';
  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#top">por<b>.</b>dev</a>
        <div className="links">
          {['work', 'story', 'about', 'education', 'contact'].map((id) => (
            <a key={id} href={`#${id}`}><T v={ui.nav[id]} /></a>
          ))}
          <a className="toggle lang" href={other} hrefLang={lang === 'en' ? 'th' : 'en'} aria-label={pick(ui.nav.switchLangLabel, lang)}>
            <T v={ui.nav.switchLang} />
          </a>
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="wrap hero" id="top">
      <div className="chapter mono"><T v={hero.chapter} /></div>
      <h1>
        <span className="fullname">{site.name}</span>
        <T v={hero.greeting} /><br />
        <span className="hl"><T v={hero.tagline} /></span>
      </h1>
      <p className="lede"><Rich text={hero.lede} /></p>
      <div className="roles">
        {hero.roles.map((r, i) => <span key={i} className={r.style || ''}><T v={r.label} /></span>)}
      </div>
      <div className="cta">
        <a className="btn" href="#work"><T v={ui.buttons.seeWork} /></a>
        <a className="btn ghost" href={site.resume} {...ext}><T v={ui.buttons.resume} /></a>
        {site.openToFreelance && (
          <a className="btn hire" href={site.freelanceUrl || `mailto:${site.email}`} {...(site.freelanceUrl ? ext : {})}>
            <T v={ui.buttons.hire} />
          </a>
        )}
      </div>
      {site.openToFreelance && (
        <p className="freenote">
          <T v={hero.freelanceNote} />{' '}
          {site.freelanceUrl && <a href={site.freelanceUrl} {...ext}><T v={site.freelanceLabel} /></a>}
        </p>
      )}
    </header>
  );
}

function Stats() {
  return (
    <div className="wrap stats">
      {stats.map((s, i) => (
        <div className="stat" key={i}><div className="n">{s.value}</div><div className="l"><T v={s.label} /></div></div>
      ))}
    </div>
  );
}

function Story() {
  return (
    <section className="wrap" id="story">
      <SectionHead copy={ui.sections.story} />
      <div className="timeline">
        {experience.map((job, i) => (
          <div className={`tl${job.past ? ' past' : ''}`} key={i}>
            <h3><T v={job.title} /></h3>
            <div className="meta"><b><T v={job.company} /></b> · <T v={job.meta} /></div>
            <div className="sub">
              {job.projects.map((p, j) => (
                <div key={j}>
                  {p.when && <i><T v={p.when} /></i>}
                  <b><T v={p.name} /></b>
                  <T v={p.note} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ lang }) {
  return (
    <section className="wrap" id="about">
      <SectionHead copy={ui.sections.about} />
      <div className="about">
        <div>{about.paragraphs.map((p, i) => <p key={i}><Rich text={p} /></p>)}</div>
        <div className="inv" aria-label={pick(ui.sections.about.inventory, lang)}>
          <h4 className="mono"><T v={ui.sections.about.inventory} /></h4>
          {about.inventory.map((row, i) => (
            <div className="row" key={i}><span><T v={row.label} /></span><span><T v={row.value} /></span></div>
          ))}
        </div>
      </div>
      <div className="skills">
        {skills.map((g, i) => (
          <div className="skill" key={i}>
            <h4><T v={g.group} /></h4>
            <div className="tags">{g.items.map((s, j) => <span key={j}>{pick(s, lang)}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="wrap" id="education">
      <SectionHead copy={ui.sections.education} />
      <div className="list">
        {education.map((e, i) => (
          <div className="li" key={i}>
            <div className="y"><T v={e.when} /></div>
            <div><h4><T v={e.name} /></h4><p><T v={e.detail} /></p></div>
          </div>
        ))}
      </div>
      {awards.map((a, i) => (
        <div className="award" key={i}><span className="t" aria-hidden="true">{a.emoji}</span><span><T v={a.text} /></span></div>
      ))}
      <div className="certs">
        {certificates.map((c, i) => {
          const body = <><b><T v={c.name} /></b><span><T v={c.detail} /></span></>;
          return c.url
            ? <a className="cert" key={i} href={c.url} {...ext}>{body}</a>
            : <div className="cert" key={i}>{body}</div>;
        })}
      </div>
      <h3 className="earlier-title"><T v={ui.sections.education.earlier} /></h3>
      <div className="mini">
        {earlierProjects.map((p, i) => (
          <a key={i} href={`https://github.com/${p.repo}`} {...ext}>
            <b><T v={p.name} /></b><p><T v={p.description} /></p><span className="repo mono">{p.repo}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const c = ui.sections.contact;
  return (
    <div className="wrap" id="contact">
      <div className="contact">
        <SectionHead copy={c} />
        <div className="cta">
          <a className="btn" href={`mailto:${site.email}`}><T v={ui.buttons.email} /></a>
          <a className="btn ghost" href={site.linkedin} {...ext}>LinkedIn ↗</a>
          <a className="btn ghost" href={site.github} {...ext}>GitHub ↗</a>
        </div>
        <div className="mail mono">{site.email}</div>
        <div className="tbc"><span className="mono">{c.tbc}</span></div>
      </div>
    </div>
  );
}

export default function App({ lang = 'en' }) {
  return (
    <LangContext.Provider value={lang}>
      <Nav lang={lang} />
      <main>
        <Hero />
        <Stats />
        <section className="wrap" id="work">
          <SectionHead copy={ui.sections.work} />
          <div className="grid">{work.map((item, i) => <Card key={i} item={item} />)}</div>
        </section>
        <section className="wrap" id="side">
          <SectionHead copy={ui.sections.side} />
          <div className="grid">{sideProjects.map((item, i) => <Card key={i} item={item} />)}</div>
        </section>
        <Story />
        <About lang={lang} />
        <Education />
        <Contact />
      </main>
      <footer className="wrap"><Rich text={ui.footer} /></footer>
    </LangContext.Provider>
  );
}
