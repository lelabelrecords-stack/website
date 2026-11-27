import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Label from '../components/ui/Label.jsx'
import Button from '../components/ui/Button.jsx'
import Cover from '../components/ui/Cover.jsx'

export default { title: 'Le Label Records/Patterns' }

export const PageType = () => (
  <>
    <Hero title="Sorties" />
    <Lead className="_row">Le catalogue du label, aussi sur Bandcamp.</Lead>
    <section className="_row">
      <h2>Une section</h2>
      <p className="_row textsize-regular-lh-small">Contenu de la section, séparée par l’espacement seul (classe spacer sur la section — jamais de hr).</p>
    </section>
  </>
)

export const FilActus = () => (
  <ul className="flex-container _row">
    <ListItem className="col-33 col-100-sp">
      <p className="list-date">18 décembre 2026 — <Label>Actu</Label> <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">En savoir plus</Button></p>
      <h3 className="___row">EP1 de KØRROBOR — le 18 décembre</h3>
      <p className="___row textsize-regular-lh-small">7 titres, résidence scénique à la Paloma…</p>
    </ListItem>
    <ListItem className="col-33 col-100-sp">
      <p className="list-date">16 octobre 2026 — <Label>Release</Label> <Button to="/news">Toutes les news</Button></p>
      <h3 className="___row">EP « Vision » de Montevideo — sorti</h3>
      <p className="___row textsize-regular-lh-small">Disponible sur Le Label et Bandcamp.</p>
  </ListItem>
  </ul>
)

export const CarteProduit = () => (
  <div className="flex-container">
    <div className="col-25 col-50-sp">
      <Cover label="Montevideo" href="https://lelabelrecords.bandcamp.com/" ariaLabel="Vision / Montevideo — écouter" />
      <p className="____row release-title"><strong>Vision</strong> / Montevideo</p>
      <p className="___row textsize-small">EP · 16 octobre 2026</p>
      <ul className="___row release-links">
        <li><Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Écouter</Button></li>
        <li><Button href="https://www.youtube.com/watch?v=Mn_pscQeAzg" target="_blank" rel="noopener noreferrer">Clip</Button></li>
      </ul>
    </div>
  </div>
)
