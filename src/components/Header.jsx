import { useEffect, useRef, useState } from 'react'
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
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'mono' ? 'mono' : 'rouge'
  )
  const navRef = useRef(null)
  const toggleRef = useRef(null)

  const target = theme === 'rouge' ? { name: 'mono', hex: '#343434' } : { name: 'rouge', hex: '#DB0000' }

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const logo = document.querySelector('#main-side .logo-svg')
        const limit = logo ? logo.getBoundingClientRect().bottom + window.scrollY : 200
        setScrolled(window.scrollY > limit)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    navRef.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const main = document.getElementById('main-container')
    const footer = document.getElementById('footer')
    main?.setAttribute('inert', '')
    footer?.setAttribute('inert', '')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
      toggleRef.current?.focus()
    }
  }, [open])

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
    <header id="header" className={scrolled ? 'is-scrolled' : undefined}>
      {scrolled && (
        <Link to="/" className="header-brand" aria-label="Le Label Records — retour à l'accueil">
          <span className="logo-svg header-logo" aria-hidden="true"></span>
          <span className="header-brand-name">Le Label Records</span>
        </Link>
      )}
      <nav
        ref={navRef}
        className={`site-nav${open ? ' is-open' : ''}`}
        aria-label="Menu de navigation"
        {...(open ? { role: 'dialog', 'aria-modal': 'true' } : {})}
      >
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
          ref={toggleRef}
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
