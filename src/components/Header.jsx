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

  const target = theme === 'rouge' ? { name: 'mono', hex: '#343434' } : { name: 'rouge', hex: '#DB0000' }

  const toggleTheme = () => {
    const next = target.name
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
              <NavLink to={l.to} end={l.end} onClick={() => setOpen(false)} className="button">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="button theme-toggle"
          onClick={toggleTheme}
          aria-pressed={theme === 'mono'}
          aria-label={`Appliquer la couleur ${target.hex} au site`}
          title={`Appliquer ${target.hex}`}
          style={{ borderColor: target.hex, color: target.hex }}
        >
          <span
            className="swatch"
            style={{ backgroundColor: target.hex, borderColor: target.hex }}
            aria-hidden="true"
          ></span>
          {`Appliquer le ${target.hex}`}
        </button>
        <button
          type="button"
          className="button nav-toggle"
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
