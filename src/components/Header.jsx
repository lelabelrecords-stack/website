import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/artistes', label: 'Artistes' },
  { to: '/sorties', label: 'Sorties' },
  { to: '/evenements', label: 'Événements' },
  { to: '/news', label: 'News' },
  { to: '/radio', label: 'Le Label²' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header id="header">
      <h1 id="site-identity">
        <Link to="/" onClick={() => setOpen(false)}>Le Label Records</Link>
      </h1>
      <nav className={`site-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav-list"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <ul id="site-nav-list">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
