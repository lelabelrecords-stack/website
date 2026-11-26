import { Link } from 'react-router-dom'
import { config } from '../data.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer">
      <div className="flex-container">
        <div className="col-50 col-100-sp footer-nav">
          <nav aria-label="Navigation pied de page">
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/artistes">Artistes</Link></li>
              <li><Link to="/sorties">Sorties</Link></li>
              <li><Link to="/evenements">Événements</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/radio">Le Label²</Link></li>
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
            </ul>
          </nav>
        </div>
        <div className="col-50 col-100-sp footer-info">
          <p><strong>{config.label_name}</strong> — {config.baseline}</p>
          <p className="textsize-small">
            {config.address} · <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
          <p className="textsize-small">
            {Object.entries(config.social).map(([key, url], i) => (
              <span key={key}>
                {i > 0 && ' · '}
                <a href={url} rel="noopener noreferrer">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="row footer-bottom">
        <p>
          © {year} {config.label_name} — Site écoconçu : aucun traceur, aucune image lourde,
          polices auto-hébergées.
        </p>
      </div>
    </footer>
  )
}
