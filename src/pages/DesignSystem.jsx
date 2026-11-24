import { useEffect, useState } from 'react'
import { usePageMeta } from '../seo.js'
import Button from '../components/ui/Button.jsx'
import Label from '../components/ui/Label.jsx'
import Tab from '../components/ui/Tab.jsx'
import Cover from '../components/ui/Cover.jsx'
import Logo from '../components/ui/Logo.jsx'

export default function DesignSystem() {
  usePageMeta('Design system — Le Label Records', 'Design system interne du site Le Label Records.')
  const [tab, setTab] = useState('actus')

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <>
      <h1 className="hero-title">Design system</h1>
      <p className="hero-sub">Tokens, grille, composants — page interne (noindex).</p>

      <hr className="_row" />

      <section aria-labelledby="ds-couleurs" className="_row">
        <h2 id="ds-couleurs">Couleurs</h2>
        <div className="flex-container _row">
          <div className="col-33 col-100-sp">
            <div className="ds-swatch ds-swatch--accent" />
            <p className="____row textsize-small">--accent (défaut) <code>#DB0000</code></p>
          </div>
          <div className="col-33 col-100-sp">
            <div className="ds-swatch ds-swatch--mono" />
            <p className="____row textsize-small">--accent thème mono <code>#343434</code></p>
          </div>
          <div className="col-33 col-100-sp">
            <div className="ds-swatch ds-swatch--bg" />
            <p className="____row textsize-small">--bg <code>#FFFFFF</code></p>
          </div>
        </div>
        <p className="__row textsize-small">
          Le thème se change avec le bouton « Appliquer le #… » dans le header (persisté en localStorage).
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-typo">
        <h2 id="ds-typo">Typographie</h2>
        <p className="__row textsize-small">
          Une seule police : <strong>Archivo Variable</strong> (graisses 100–900), 1 fichier woff2 latin
          auto-hébergé (<code>/fonts/archivo-latin-wght-normal.woff2</code>, @font-face dans
          <code>tokens.scss</code>). Le display (hero, marquee) utilise la graisse 900.
        </p>
        <p className="hero-title _row">Hero title</p>
        <h2 className="__row">h2 — titre de section</h2>
        <h3 className="__row">h3 — sous-section</h3>
        <p className="__row">Paragraphe standard (Archivo 400, 1rem / 1.667).</p>
        <p className="__row textsize-regular-lh-small">textsize-regular-lh-small (1rem / 1.25).</p>
        <p className="__row textsize-small">textsize-small (0.833rem / 1.25, 0.667rem sur mobile).</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-grille">
        <h2 id="ds-grille">Grille &amp; espacements</h2>
        <div className="flex-container _row">
          {[25, 25, 25, 25].map((c, i) => (
            <div key={i} className={`col-${c} col-50-sp`}>
              <div className="ds-box">col-{c}</div>
            </div>
          ))}
        </div>
        <p className="__row textsize-small">
          Colonnes <code>.col-10…100</code> + suffixes <code>-pc-small</code> (≤1280), <code>-tablet</code> (≤1023),
          <code>-sp</code> (≤767), <code>-pc-large</code> (≥1700). Gouttière 25px (12.5px sur mobile).
          Spacers : <code>.row</code> 50px, <code>._row</code> 25px, <code>.__row</code> 12.5px,
          <code>.___row</code> 8.3px, <code>.____row</code> 6.25px, <code>._____row</code> 5px. Filet : <code>&lt;hr&gt;</code> 1px.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-composants">
        <h2 id="ds-composants">Composants (ui/)</h2>

        <h3 className="_row">Button</h3>
        <p className="__row">
          <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>{' '}
          <Button to="/contact">Contact</Button>
        </p>
        <p className="__row textsize-small">
          Contour 1px, rempli au survol/focus — couleurs via var(--accent). Utilisé PARTOUT :
          liens d'action (« En savoir plus »…), nav du header, onglets de catégories, boutons thème/menu.
          Actif = rempli (aria-current / aria-selected).
        </p>

        <h3 className="_row">Label</h3>
        <p className="__row">
          <Label>concert</Label> <Label filled>release</Label>
        </p>
        <p className="__row textsize-small">Étiquette de catégorie, toujours préfixée d'un # (dans la primitive).</p>

        <h3 className="_row">Tab</h3>
        <div className="tabs __row" role="tablist" aria-label="Démo onglets">
          <Tab selected={tab === 'actus'} controls="ds-panel" onClick={() => setTab('actus')}>Actus</Tab>
          <Tab selected={tab === 'events'} controls="ds-panel" onClick={() => setTab('events')}>Événements</Tab>
        </div>
        <p className="__row textsize-small" id="ds-panel" role="tabpanel">
          Onglet actif : <strong>{tab}</strong>
        </p>

        <h3 className="_row">Cover (carte produit)</h3>
        <div className="flex-container __row">
          <div className="col-25 col-50-sp">
            <Cover label="EP" href="https://lelabelrecords.bandcamp.com/" ariaLabel="Exemple EP — écouter" />
            <p className="____row textsize-small"><strong>Vision</strong> / Montevideo</p>
          </div>
          <div className="col-25 col-50-sp">
            <Cover label="Single" />
            <p className="____row textsize-small"><strong>Brawn</strong> / Montevideo</p>
          </div>
        </div>

        <h3 className="_row">Logo</h3>
        <p className="__row"><Logo /></p>
        <p className="__row textsize-small">Masque CSS sur var(--accent) — suit le thème.</p>
      </section>
    </>
  )
}
