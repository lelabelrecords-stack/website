import { useEffect, useState } from 'react'
import { MemoryRouter, NavLink } from 'react-router-dom'
import Button from './Button.jsx'
import Label from './Label.jsx'
import Tab from './Tab.jsx'
import Cover from './Cover.jsx'
import Logo from './Logo.jsx'
import Hero from './Hero.jsx'
import Lead from './Lead.jsx'
import ListItem from './ListItem.jsx'
import Marquee from './Marquee.jsx'

export default {
  title: 'UI/Le Label Records',
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>]
}

export const Boutons = () => (
  <p>
    <Button to="/contact">Contact</Button>{' '}
    <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>
  </p>
)

export const Etiquettes = () => (
  <p><Label>concert</Label> <Label filled>release</Label></p>
)

export const Onglets = () => {
  const [t, setT] = useState('actus')
  return (
    <div className="tabs" role="tablist" aria-label="Démo onglets">
      <Tab selected={t === 'actus'} controls="story-panel" onClick={() => setT('actus')}>Actus</Tab>
      <Tab selected={t === 'events'} controls="story-panel" onClick={() => setT('events')}>Événements</Tab>
      <p id="story-panel" role="tabpanel" className="__row">Onglet actif : <strong>{t}</strong> (flèches ← → au clavier)</p>
    </div>
  )
}

export const Carte = () => (
  <div style={{ maxWidth: 240 }}>
    <Cover label="EP" href="https://lelabelrecords.bandcamp.com/" ariaLabel="Exemple EP — écouter" />
    <p className="____row textsize-small"><strong>Vision</strong> / Montevideo</p>
  </div>
)

export const Logotype = () => (
  <div style={{ maxWidth: 160 }}>
    <Logo />
    <p className="____row textsize-small">Logo masque CSS — suit var(--accent), donc le thème.</p>
  </div>
)

export const HeroEtLead = () => (
  <>
    <Hero title={<>Le Label<br />Records</>} sub="Label indépendant — Nîmes, France" />
    <Lead className="_row">Exemple de lead — graisse 900, taille fluide.</Lead>
  </>
)

export const Liste = () => (
  <ul><ListItem>Premier élément</ListItem><ListItem>Deuxième élément</ListItem></ul>
)

export const Bandeau = () => <Marquee text="K0RROBOR · Montevideo · Le Label² · Nîmes" />

const ThemeMonoStory = () => {
  useEffect(() => {
    document.documentElement.dataset.theme = 'mono'
    return () => { delete document.documentElement.dataset.theme }
  }, [])
  return (
    <>
      <Hero title="Thème mono" sub="#343434 appliqué" />
      <p className="_row"><Button to="/contact">Bouton en #343434</Button></p>
    </>
  )
}

export const ThemeMono = { render: () => <ThemeMonoStory /> }

export const BoutonActif = () => (
  <nav className="site-nav" aria-label="Démo état actif">
    <ul style={{ display: 'flex', gap: '10px' }}>
      <li><NavLink to="/" end className="button">Accueil (actif, rempli)</NavLink></li>
      <li><NavLink to="/contact" className="button">Contact</NavLink></li>
    </ul>
  </nav>
)

export const HeroSansSub = () => <Hero title="Sorties" />

export const CarteSansLien = () => (
  <div style={{ maxWidth: 240 }}>
    <Cover label="Single" />
    <p className="____row textsize-small"><strong>Brawn</strong> / Montevideo</p>
  </div>
)

export const Jetons = () => (
  <div>
    <p><strong>Couleurs</strong></p>
    <p>
      <span className="label label--filled">--accent #DB0000</span>{' '}
      <span className="label">thème mono #343434</span>{' '}
      <span className="label">--bg #FFFFFF</span>
    </p>
    <p className="__row"><strong>Espacement</strong> : .row 50px · ._row 25 · .__row 12.5 · .___row 8.3 · .____row 6.25 · ._____row 5</p>
    <p><strong>Typo</strong> : hero clamp(3.5–12rem) 900 · lead clamp(1.5–2.5rem) 900 · regular 1rem · small 0.833rem</p>
    <p><strong>Breakpoints</strong> : 767 / 1023 / 1280 / 1700 px · gouttière 25px (12.5px mobile)</p>
    <p><strong>Divers</strong> : filet $bw 1px · radius 0 · z 40/50/60/100 · $dur 0.2s</p>
  </div>
)
