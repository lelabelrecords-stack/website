import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'mono' ? 'mono' : 'rouge'
  )

  const toggleTheme = () => {
    const next = theme === 'mono' ? 'rouge' : 'mono'
    setTheme(next)
    if (next === 'mono') {
      document.documentElement.dataset.theme = 'mono'
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem('theme', next)
    } catch (e) { /* navigation privée : on ignore */ }
  }

  return (
    <header id="header">
      <nav className={`site-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
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
      <div className="header-actions">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-pressed={theme === 'mono'}
          aria-label={`Changer la couleur du site (actuellement ${theme === 'mono' ? 'gris #343434' : 'rouge #db0000'})`}
          title="Changer de couleur"
        >
          <span className="swatch" aria-hidden="true"></span>
          {theme === 'mono' ? 'Gris' : 'Rouge'}
        </button>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav-list"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
