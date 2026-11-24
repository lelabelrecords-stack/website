import { useEffect, useState } from 'react'
import { usePageMeta } from '../seo.js'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import Button from '../components/ui/Button.jsx'
import Label from '../components/ui/Label.jsx'
import Tab from '../components/ui/Tab.jsx'
import Cover from '../components/ui/Cover.jsx'
import Logo from '../components/ui/Logo.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Marquee from '../components/ui/Marquee.jsx'

export default function DesignSystem() {
  usePageMeta('Design system — Le Label Records', 'Design system interne du site Le Label Records.')
  const [tab, setTab] = useState('actus')

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <>
      <Hero title="Design system" sub="Contrat interne du site Le Label Records — page noindex." />

      <section aria-labelledby="ds-lois" className="_row">
        <h2 id="ds-lois">Lois du DS</h2>
        <ul className="_row">
          <ListItem>1 seul <code>h1.hero-title</code> par page, rendu par la primitive <code>&lt;Hero&gt;</code>.</ListItem>
          <ListItem>Couleurs 100 % via <code>var(--accent/--bg/--on-accent)</code> — jamais de hexadécimal en dur dans un composant (sauf swatches du DS).</ListItem>
          <ListItem><code>border-radius: 0</code> partout (<code>$radius</code>), filet unique <code>$bw: 1px</code>.</ListItem>
          <ListItem>États interactifs uniquement via ARIA (<code>aria-current</code>, <code>aria-selected</code>, <code>aria-pressed</code>, <code>aria-expanded</code>, <code>aria-modal</code>).</ListItem>
          <ListItem><code>:focus-visible</code> obligatoire, <code>prefers-reduced-motion</code> respecté, contraste AA (rouge #DB0000 sur blanc = 5.23:1, mono #343434 = 12.45:1).</ListItem>
          <ListItem>Skip-link : la cible <code>#main</code> a <code>tabIndex={-1}</code> (focus clavier effectif).</ListItem>
          <ListItem>Menu plein écran = dialog modal : <code>role="dialog" aria-modal="true"</code>, contenu derrière en <code>inert</code>, focus sur le 1<sup>er</sup> lien, Échap ferme, focus rendu au bouton Menu.</ListItem>
          <ListItem>Onglets : roving tabindex (<code>tabIndex</code> 0/-1) + flèches ←→↑↓ avec activation automatique (dans la primitive <code>&lt;Tab&gt;</code>).</ListItem>
          <ListItem>Tout lien d'action passe par <code>&lt;Button&gt;</code> — jamais d'ancre <code>className="button"</code> brute.</ListItem>
          <ListItem>Structure : <code>tokens.scss</code> → partial <code>components/*.scss</code> → primitive <code>ui/*.jsx</code> → documenté ici → testé en SSR.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-tokens">
        <h2 id="ds-tokens">Tokens</h2>
        <h3 className="_row">Couleurs</h3>
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
        <h3 className="_row">Échelles</h3>
        <ul className="__row textsize-small">
          <ListItem>Espacement vertical <code>$spaces</code> → classes <code>.row</code> 50px, <code>._row</code> 25px, <code>.__row</code> 12.5px, <code>.___row</code> 8.3px, <code>.____row</code> 6.25px, <code>._____row</code> 5px.</ListItem>
          <ListItem>Typo <code>$fs-small/regular/lead/hero/marquee</code> (lead et hero en <code>clamp()</code> fluide), interlignes <code>$lh-regular/$lh-small</code>.</ListItem>
          <ListItem>Breakpoints <code>$sp</code> 767, <code>$tablet</code> 1023, <code>$pc-small</code> 1280, <code>$pc-large</code> 1700 ; gouttière <code>$gut</code> 25px (12.5px ≤767px).</ListItem>
          <ListItem>Divers : <code>$bw</code> 1px, <code>$radius</code> 0, <code>$z-header/menu/actions/skip</code>, <code>$dur</code> 0.2s.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-typo">
        <h2 id="ds-typo">Typographie</h2>
        <p className="__row textsize-small">
          Une seule police : <strong>Archivo Variable</strong> (graisses 100–900), 1 fichier woff2 latin
          auto-hébergé (inliné en data URI dans le CSS au build). Le display (hero, marquee) utilise la graisse 900.
        </p>
        <p className="hero-title _row">Hero title</p>
        <Lead className="__row">Exemple de lead — graisse 900, taille fluide.</Lead>
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
          <code>&lt;hr&gt;</code> = espaceur invisible (aucun filet, aucun fond).
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-composants">
        <h2 id="ds-composants">Composants (ui/)</h2>

        <h3 className="_row">Hero &amp; Lead</h3>
        <p className="__row textsize-small">
          <code>&lt;Hero title sub /&gt;</code> rend le seul <code>h1.hero-title</code> de la page ;
          <code>&lt;Lead&gt;</code> le chapô en graisse 900. Exemple vivant en haut de cette page.
        </p>

        <h3 className="_row">Marquee</h3>
        <Marquee text="Exemple de marquee · Le Label Records" />

        <h3 className="_row">Button</h3>
        <p className="__row">
          <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>{' '}
          <Button to="/contact">Contact</Button>
        </p>
        <p className="__row textsize-small">
          Contour 1px, rempli au survol/focus — couleurs via var(--accent). Utilisé PARTOUT :
          liens d'action (« En savoir plus »…), liens du menu plein écran, onglets, boutons thème/menu.
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
          Onglet actif : <strong>{tab}</strong> — naviguez au clavier avec les flèches ← →.
        </p>

        <h3 className="_row">ListItem</h3>
        <ul className="__row">
          <ListItem>Exemple d'élément de liste (filet 1px haut/bas).</ListItem>
        </ul>

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

        <h3 className="_row">Header</h3>
        <p className="__row textsize-small">
          Sticky, <strong>aucune nav en ligne</strong> : navigation uniquement via le bouton
          <code>Menu</code> (<code>.button.nav-toggle</code>, visible à toutes les tailles) qui ouvre le menu
          plein écran (<code>.site-nav.is-open</code>) en dialog modal
          (<code>role="dialog" aria-modal="true"</code>, page et footer <code>inert</code>,
          Échap ferme, focus sur le 1<sup>er</sup> lien puis rendu au bouton Menu).
          Au scroll, le header affiche la marque (<code>.header-brand</code> = logo + « Le Label Records »,
          classe <code>is-scrolled</code> posée par <code>Header.jsx</code> ; nom masqué ≤767px).
          Bouton thème « Appliquer le #… » à droite.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-eco">
        <h2 id="ds-eco">Écoconception &amp; perf</h2>
        <ul className="_row">
          <ListItem><strong>Zéro image raster</strong> : logo SVG en masque CSS (suit le thème), pochettes typographiques, SVG minifiés (svgo).</ListItem>
          <ListItem><strong>1 seule police</strong> : Archivo Variable latin, inlinée en data URI dans le CSS au build (1 requête en moins, rien à compresser en plus).</ListItem>
          <ListItem><strong>Zéro traceur / cookie / mesure d'audience</strong> ; le choix de thème reste en localStorage côté client.</ListItem>
          <ListItem><strong>Tout est auto-hébergé</strong> (CSS, JS, police, SVG) : aucune requête externe au runtime.</ListItem>
          <ListItem><strong>Compression</strong> gzip/brotli automatique au niveau de l'edge Cloudflare Pages ; assets minifiés (Vite) ; <code>print.css</code> dédié (RWEB_0031).</ListItem>
          <ListItem><strong>Budget de poids</strong> (build prod) : JS ≈ 90 Ko gzip, CSS ≈ 39 Ko gzip (police incluse), HTML ≈ 1 Ko. <code>prefers-reduced-motion</code> respecté (marquee, scroll).</ListItem>
          <ListItem><strong>Sécurité</strong> : <code>_headers</code> — CSP strict, HSTS, nosniff, frame-ancestors 'none'.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-guide">
        <h2 id="ds-guide">Ajouter un composant</h2>
        <ol className="_row">
          <ListItem>1. Token dans <code>tokens.scss</code> si valeur réutilisable (couleur, taille, espace, z-index…).</ListItem>
          <ListItem>2. Partial <code>src/styles/components/x.scss</code> + <code>@use</code> dans <code>main.scss</code>.</ListItem>
          <ListItem>3. Primitive <code>src/components/ui/X.jsx</code> (props explicites, états ARIA, aucune classe magique).</ListItem>
          <ListItem>4. Documenter ici + vérifier : <code>npm run build</code> puis rendu SSR des 11 routes (1 <code>h1.hero-title</code> par page).</ListItem>
        </ol>
      </section>
    </>
  )
}
