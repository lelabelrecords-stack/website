import { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
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

export const Logotype = () => <Logo />

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
