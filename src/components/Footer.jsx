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
            </ul>
          </nav>
        </div>
        <div className="col-50 col-100-sp">
          <p><strong>{config.label_name}</strong></p>
          <p className="textsize-small">{config.baseline}</p>
          <p className="textsize-small">{config.address}</p>
          <p className="textsize-small">
            <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
          <p className="textsize-small">
            <a href={config.social.bandcamp} rel="noopener noreferrer">Bandcamp</a>
            {' · '}
            <a href={config.social.linktree} rel="noopener noreferrer">Linktree</a>
            {' · '}
            <a href={config.social.youtube} rel="noopener noreferrer">YouTube</a>
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
