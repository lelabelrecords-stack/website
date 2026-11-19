import { Link, NavLink } from 'react-router-dom'
import config from '../../data/config.json'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/artistes', label: 'Artistes' },
  { to: '/sorties', label: 'Sorties' },
  { to: '/evenements', label: 'Événements' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
]

export default function Header() {
  return (
    <header className="header">
      <div className="row header__row">
        <Link to="/" className="header__brand">
          <span className="header__wordmark">LE LABEL</span>
          <span className="header__baseline">{config.baseline}</span>
        </Link>
        <nav className="nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="nav__link nav__link--cta" to={{ pathname: '/', hash: '#newsletter' }}>
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  )
}
