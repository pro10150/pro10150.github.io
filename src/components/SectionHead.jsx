import { Rich } from '../i18n';

export default function SectionHead({ copy }) {
  return (
    <>
      <div className="chapter mono"><Rich text={copy.chapter} /></div>
      <h2><Rich text={copy.title} /></h2>
      {copy.subtitle && <p className="h2sub"><Rich text={copy.subtitle} /></p>}
    </>
  );
}
