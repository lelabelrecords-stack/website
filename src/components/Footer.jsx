import { Link } from 'react-router-dom'
import config from '../../data/config.json'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="row footer__grid">
        <div className="footer__col">
          <p className="footer__brand">LE LABEL</p>
          <p className="footer__line">{config.address}</p>
          <p className="footer__line">
            <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
          <p className="footer__line">
            <a href={config.social.linktree} target="_blank" rel="noreferrer">linktr.ee/le.label</a>
          </p>
        </div>
        <div className="footer__col">
          <p className="footer__title">Suivre</p>
          <p className="footer__line">
            <a href={config.social.bandcamp} target="_blank" rel="noreferrer">Bandcamp — tout le catalogue</a>
          </p>
          {config.radio.slots.map((s) => (
            <p className="footer__line" key={s.label}>
              <a href={s.link} target="_blank" rel="noreferrer">{s.label}</a> — Le Label²
            </p>
          ))}
        </div>
        <div className="footer__col">
          <p className="footer__title">Le site</p>
          <p className="footer__line"><Link to="/artistes">Artistes</Link></p>
          <p className="footer__line"><Link to="/sorties">Sorties</Link></p>
          <p className="footer__line"><Link to="/evenements">Événements</Link></p>
          <p className="footer__line"><Link to="/a-propos">À propos</Link></p>
          <p className="footer__line"><Link to="/contact">Contact</Link></p>
        </div>
      </div>
      <div className="row footer__bottom">
        <p>© {new Date().getFullYear()} {config.label_name} — Nîmes · Design brutaliste inspiré d'utrecht.jp</p>
      </div>
    </footer>
  )
}
