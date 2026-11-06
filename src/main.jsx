import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const el = document.getElementById('root');
const lang = document.documentElement.lang === 'th' ? 'th' : 'en';
if (el.hasChildNodes()) hydrateRoot(el, <App lang={lang} />);
else createRoot(el).render(<App lang={lang} />);
