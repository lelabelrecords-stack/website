import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Logo from './components/ui/Logo.jsx'
import Home from './pages/Home.jsx'
import Artistes from './pages/Artistes.jsx'
import Sorties from './pages/Sorties.jsx'
import Evenements from './pages/Evenements.jsx'
import News from './pages/News.jsx'
import Radio from './pages/Radio.jsx'
import APropos from './pages/APropos.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import DesignSystem from './pages/DesignSystem.jsx'
import { config } from './data.js'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <ScrollToTop />
      <Header />
      <div id="main-container" className={`flex-container is-flex-wrap-nowrap is-break-tablet${pathname === '/' ? ' is-home' : ''}`}>
        <aside id="main-side" aria-label="Coordonnées du label">
          <Logo />
          <p className="is-writing-mode-vertical is-writing-mode-break-tablet">
            {config.label_name} — {config.address}
            <br />
            <a href={`mailto:${config.email}`}>{config.email}</a>
          </p>
        </aside>
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artistes" element={<Artistes />} />
            <Route path="/sorties" element={<Sorties />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/news" element={<News />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            {import.meta.env.DEV && <Route path="/design-system" element={<DesignSystem />} />}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  )
}
