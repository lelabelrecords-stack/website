import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Artistes from './pages/Artistes.jsx'
import Sorties from './pages/Sorties.jsx'
import Evenements from './pages/Evenements.jsx'
import News from './pages/News.jsx'
import Radio from './pages/Radio.jsx'
import APropos from './pages/APropos.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

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
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <ScrollToTop />
      <Header />
      <main id="main" className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/sorties" element={<Sorties />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/news" element={<News />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
