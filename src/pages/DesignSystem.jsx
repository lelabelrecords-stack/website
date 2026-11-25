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

function PropsTable({ rows }) {
  return (
    <table className="ds-table __row">
      <thead>
        <tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Rôle</th></tr>
      </thead>
      <tbody>
        {rows.map(([p, t, r]) => (
          <tr key={p}><td><code>{p}</code></td><td>{t}</td><td>{r}</td></tr>
        ))}
      </tbody>
    </table>
  )
}

function Regles({ faire, eviter }) {
  return (
    <div className="__row">
      <p><Label filled>À faire</Label> {faire}</p>
      <p className="___row"><Label>À éviter</Label> {eviter}</p>
    </div>
  )
}

function Code({ children }) {
  return <pre className="ds-code __row"><code>{children}</code></pre>
}

const TOC = [
  ['ds-principes', 'Principes'],
  ['ds-couleur', 'Couleur'],
  ['ds-typo', 'Typographie'],
  ['ds-grille', 'Grille & espacements'],
  ['ds-visuels', 'Visuels'],
  ['ds-motion', 'Motion'],
  ['ds-tokens', 'Tokens (référence)'],
  ['ds-composants', 'Composants'],
  ['ds-patterns', 'Patterns'],
  ['ds-voix', 'Voix & contenu'],
  ['ds-a11y', 'Accessibilité'],
  ['ds-eco', 'Écoconception & perf'],
  ['ds-storybook', 'Vitrine Storybook'],
  ['ds-guide', 'Ajouter un composant']
]

export default function DesignSystem() {
  usePageMeta('Design system — Le Label Records', 'Design system interne du site Le Label Records.')
  const [tab, setTab] = useState('actus')

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <>
      <Hero title="Design system" sub="Contrat interne — visible uniquement en dev (npm run dev), non embarqué en prod : le DS public vit sur Storybook." />
      <p className="_row textsize-regular-lh-small">
        <strong>Le Label Records</strong> : label indépendant à Nîmes, co-dirigé par Christophe et Roxane —
        ce DS existe pour que le site reste cohérent, accessible (WCAG AA) et économe (0 raster, 1 police inlinée, 0 traceur)
        au fil des ajouts. Une seule source de vérité : tokens → partials → primitives ui/ → Storybook.
      </p>

      <nav aria-label="Sommaire du design system" className="_row">
        <ul className="release-links">
          {TOC.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ul>
      </nav>

      <hr className="_row" />

      <section aria-labelledby="ds-principes" id="ds-principes">
        <h2 id="ds-principes">Principes</h2>
        <ul className="_row">
          <ListItem><strong>Clarté</strong> — un seul <code>h1</code> par page, texte en couleur d'accent sur fond uni, chaque élément a un rôle évident.</ListItem>
          <ListItem><strong>Cohérence</strong> — tout passe par les tokens et les primitives <code>ui/</code> ; aucune valeur en dur dans une page.</ListItem>
          <ListItem><strong>Hiérarchie</strong> — la typographie fait le tri : hero 900 géant, lead 900 fluide, corps 400, métadonnées small.</ListItem>
          <ListItem><strong>Accessibilité</strong> — WCAG AA : contraste mesuré, focus visible, clavier complet, ARIA sémantique, reduced-motion.</ListItem>
          <ListItem><strong>Écoconception</strong> — 0 image raster, 1 police inlinée, 0 traceur, poids mini, compression edge.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-couleur" id="ds-couleur">
        <h2 id="ds-couleur">Couleur</h2>
        <div className="flex-container _row">
          <div className="col-25 col-50-sp">
            <div className="ds-swatch ds-swatch--accent" />
            <p className="____row textsize-small">--accent (défaut) <code>#DB0000</code></p>
          </div>
          <div className="col-25 col-50-sp">
            <div className="ds-swatch ds-swatch--mono" />
            <p className="____row textsize-small">--accent thème mono <code>#343434</code> (<code>html[data-theme='mono']</code>)</p>
          </div>
          <div className="col-25 col-50-sp">
            <div className="ds-swatch ds-swatch--bg" />
            <p className="____row textsize-small">--bg <code>#FFFFFF</code></p>
          </div>
          <div className="col-25 col-50-sp">
            <div className="ds-swatch" style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)', lineHeight: '4rem', textAlign: 'center' }}>Aa</div>
            <p className="____row textsize-small">--on-accent <code>#FFFFFF</code> (texte sur fond plein)</p>
          </div>
        </div>
        <PropsTable
          rows={[
            ['Contraste accent/bg', '5.23:1', 'Passe AA texte normal (≥ 4.5:1)'],
            ['Contraste mono/bg', '12.45:1', 'Passe AAA'],
            ['Contraste on-accent/accent', '5.23:1 / 12.45:1', 'Texte sur bouton rempli / footer'],
            ['Thème', 'data-theme + localStorage', 'Bouton « Appliquer le #… » dans le header, anti-FOUC via theme.js']
          ]}
        />
        <Regles
          faire="utiliser uniquement var(--accent), var(--bg), var(--on-accent) — le thème suit partout, y compris le logo (masque CSS)."
          eviter="aucun code hex en dur dans un composant ou une page (les swatches de cette page sont la seule exception)."
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-typo" id="ds-typo">
        <h2 id="ds-typo">Typographie</h2>
        <p className="_row textsize-small">
          Une seule police : <strong>Archivo Variable</strong> (graisses 100–900, 1 woff2 latin inliné en data URI dans le CSS).
          Base 12px (14px ≥ 1700px). Le display utilise la graisse 900 (<code>$font-black</code>).
        </p>
        <PropsTable
          rows={[
            ['$fs-hero', 'clamp(3.5rem, 14vw, 12rem)', 'h1.hero-title — 1 par page, via <Hero>'],
            ['$fs-lead', 'clamp(1.5rem, 3.2vw, 2.5rem)', 'chapô, via <Lead> (graisse 900, lh 1.15)'],
            ['$fs-regular', '1rem', 'corps de texte (lh $lh-regular 1.667)'],
            ['$fs-marquee', '1.25rem', 'bandeau défilant (graisse 900, capitales)'],
            ['$fs-small', '0.83333rem', 'métadonnées (0.667rem ≤ 767px), lh $lh-small 1.25']
          ]}
        />
        <p className="hero-title _row">Hero title</p>
        <Lead className="__row">Exemple de lead — graisse 900, taille fluide.</Lead>
        <h2 className="__row">h2 — titre de section</h2>
        <h3 className="__row">h3 — sous-section</h3>
        <p className="__row">Paragraphe standard (Archivo 400, 1rem / 1.667).</p>
        <p className="__row textsize-regular-lh-small">textsize-regular-lh-small (1rem / 1.25).</p>
        <p className="__row textsize-small">textsize-small (0.833rem / 1.25, 0.667rem sur mobile).</p>
        <Regles
          faire="choisir la taille dans l'échelle $fs-* et la graisse selon le rôle (900 = display uniquement)."
          eviter="aucune taille hors échelle, aucun font-size en dur, aucune deuxième police."
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-grille" id="ds-grille">
        <h2 id="ds-grille">Grille &amp; espacements</h2>
        <div className="flex-container _row">
          {[25, 25, 25, 25].map((c, i) => (
            <div key={i} className={`col-${c} col-50-sp`}>
              <div className="ds-box">col-{c}</div>
            </div>
          ))}
        </div>
        <PropsTable
          rows={[
            ['Gouttière $gut', '25px (12.5px ≤ 767px)', 'padding des .col-*, marge négative du .flex-container'],
            ['Colonnes', '.col-10…100', 'largeur en % + suffixes -pc-small (≤1280), -tablet (≤1023), -sp (≤767), -pc-large (≥1700)'],
            ['Breakpoints', '$sp 767 · $tablet 1023 · $pc-small 1280 · $pc-large 1700', 'toujours via les tokens, jamais de media query en dur'],
            ['Spacers $spaces', '.row 50 · ._row 25 · .__row 12.5 · .___row 8.3 · .____row 6.25 · ._____row 5 px', 'rythme vertical unique (padding-top)'],
            ['<hr>', 'espaceur invisible', 'border 0, height 0 — aucun filet, l\'espacement vient de la classe spacer associée']
          ]}
        />
        <Regles
          faire="espacer exclusivement avec les classes de $spaces, poser la grille avec .flex-container + .col-*."
          eviter="aucun margin/padding custom en px, aucun <hr> visible, aucune grille parallèle."
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-visuels" id="ds-visuels">
        <h2 id="ds-visuels">Visuels</h2>
        <ul className="_row">
          <ListItem><strong>Zéro image raster</strong> : le logo est un masque CSS (<code>.logo-svg</code>, suit var(--accent)), les pochettes sont des blocs typographiques (<code>Cover</code>).</ListItem>
          <ListItem><strong>Proportions</strong> : <code>.image-container</code> = 3:2 (bannière), <code>.is-product</code> = 2:3 (carte). Contour 1px <code>.cover--red</code>, rempli au survol/focus (<code>.hover-image</code>).</ListItem>
          <ListItem><strong>Pastille</strong> : <code>.image-label</code> centrée sur le visuel (type de sortie), ellipsis ≤ 767px.</ListItem>
          <ListItem><strong>SVG</strong> : minifiés (svgo), auto-hébergés, <code>stroke: currentColor</code> quand ils servent de masque.</ListItem>
        </ul>
        <Regles
          faire="tout visuel est un composant (Cover, Logo) ou un SVG vectoriel auto-hébergé."
          eviter="aucune photo/JPG/PNG, aucun SVG externe, aucun <img> sans alternative textuelle équivalente."
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-motion" id="ds-motion">
        <h2 id="ds-motion">Motion</h2>
        <ul className="_row">
          <ListItem><strong>$dur = 0.2s</strong> : unique durée de transition (skip-link, hover).</ListItem>
          <ListItem><strong>Marquee</strong> : 28s linéaire, en pause au survol/focus, arrêtée si <code>prefers-reduced-motion</code>.</ListItem>
          <ListItem><strong>Scroll</strong> : <code>scroll-behavior: smooth</code>, désactivé si reduced-motion ; règle globale qui neutralise toutes les animations sous reduced-motion.</ListItem>
        </ul>
        <Regles
          faire="toute animation passe par $dur ou une keyframe documentée, et respecte reduced-motion."
          eviter="aucune transition/animation ad hoc, aucun effet qui ne peut pas être désactivé."
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-tokens" id="ds-tokens">
        <h2 id="ds-tokens">Tokens — référence complète</h2>
        <p className="_row textsize-small">Source unique : <code>src/styles/tokens.scss</code>. Toute valeur répétée y naît, nulle part ailleurs.</p>
        <PropsTable
          rows={[
            ['--accent / --bg / --on-accent', 'CSS vars', '#DB0000 / #FFFFFF / #FFFFFF — thème mono #343434 via html[data-theme]'],
            ['$font / $font-black', 'font-family', 'Archivo (fallback système) / Archivo Variable 900 pour le display'],
            ['$sp / $tablet / $pc-small / $pc-large', 'breakpoints', '767 / 1023 / 1280 / 1700 px'],
            ['$gut', '25px (12.5px ≤ $sp)', 'gouttière de la grille'],
            ['$cols', 'liste 10…100', 'génère .col-10…100 + suffixes de breakpoints'],
            ['$spaces', 'map 6 paliers', 'génère .row (50px) … ._____row (5px) en padding-top'],
            ['$fs-hero / $fs-lead / $fs-regular / $fs-marquee / $fs-small', 'clamp / rem', 'échelle typographique (voir Typographie)'],
            ['$lh-regular / $lh-small', 'rem', '1.667rem / 1.25rem'],
            ['$bw', '1px', 'unique épaisseur de filet (bordures, hr invisible, focus 2px)'],
            ['$radius', '0', 'aucun arrondi, partout'],
            ['$z-header / $z-menu / $z-actions / $z-skip', '40 / 50 / 60 / 100', 'ordre des couches'],
            ['$dur', '0.2s', 'unique durée de transition']
          ]}
        />
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-composants" id="ds-composants">
        <h2 id="ds-composants">Composants (ui/)</h2>
        <p className="_row textsize-small">Chaque composant a un partial SCSS dédié (<code>styles/components/*.scss</code>) et une story Storybook.</p>

        <h3 className="_row">Hero</h3>
        <PropsTable rows={[
          ['title', 'node', 'contenu du seul h1.hero-title de la page'],
          ['sub', 'node (optionnel)', 'sous-titre hero-sub']
        ]} />
        <Regles faire="un <Hero> par page, en premier dans #main." eviter="jamais de deuxième h1, jamais de h1 hors <Hero>." />
        <Code>{'<Hero title="Sorties" />\n<Hero title={<>Le Label<br />Records</>} sub="Label indépendant — Nîmes, France" />'}</Code>

        <h3 className="_row">Lead</h3>
        <PropsTable rows={[
          ['className', 'string', 'souvent un spacer (ex. _row)'],
          ['children', 'node', 'chapô de la page/section']
        ]} />
        <p className="__row"><Lead>Exemple vivant de Lead.</Lead></p>
        <Code>{'<Lead className="_row">Le roster du label.</Lead>'}</Code>

        <h3 className="_row">Button</h3>
        <p className="__row">
          <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>{' '}
          <Button to="/contact">Contact</Button>
        </p>
        <PropsTable rows={[
          ['to', 'string', 'lien interne (Link)'],
          ['href', 'string', 'lien externe — avec target="_blank" rel="noopener noreferrer"'],
          ['className', 'string', 'variante (ex. dans .list-date)']
        ]} />
        <p className="__row textsize-small">
          États : contour 1px → rempli au survol/focus ; actif = rempli via <code>aria-current</code> / <code>aria-selected</code>.
          Cible ≈ 32px de haut (≥ 24px WCAG 2.5.8). Couleurs 100 % var(--*).
        </p>
        <Regles
          faire="toute action/lien de navigation passe par <Button>."
          eviter={'aucune ancre <code>className="button"</code> écrite à la main, aucun border-radius.'}
        />
        <Code>{'<Button to="/contact">Contact</Button>\n<Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>'}</Code>

        <h3 className="_row">Label</h3>
        <p className="__row"><Label>concert</Label> <Label filled>release</Label></p>
        <PropsTable rows={[
          ['filled', 'bool', 'version pleine (fond accent)'],
          ['children', 'node', 'texte de l\'étiquette — rendu précédé d\'un # automatique']
        ]} />
        <Regles faire="pour les catégories/étiquettes." eviter="jamais comme bouton cliquable (pas de onClick sur un Label)." />

        <h3 className="_row">Tab</h3>
        <div className="tabs __row" role="tablist" aria-label="Démo onglets">
          <Tab selected={tab === 'actus'} controls="ds-panel" onClick={() => setTab('actus')}>Actus</Tab>
          <Tab selected={tab === 'events'} controls="ds-panel" onClick={() => setTab('events')}>Événements</Tab>
        </div>
        <p className="__row textsize-small" id="ds-panel" role="tabpanel">
          Onglet actif : <strong>{tab}</strong> — naviguez au clavier avec les flèches ← → ↑ ↓ (roving tabindex dans la primitive).
        </p>
        <Code>{'<div className="tabs" role="tablist" aria-label="Catégories">\n  <Tab selected={t === \'actus\'} controls="panel" onClick={() => setT(\'actus\')}>Actus</Tab>\n</div>'}</Code>
        <PropsTable rows={[
          ['selected', 'bool', 'aria-selected + tabIndex 0 (les autres -1)'],
          ['onClick', 'fn', 'sélection (activation automatique aussi via les flèches)'],
          ['controls', 'id', 'aria-controls → id du tabpanel']
        ]} />

        <h3 className="_row">ListItem</h3>
        <ul className="__row">
          <ListItem>Exemple d'élément de liste (filet 1px haut, dernier élément filet bas).</ListItem>
        </ul>
        <PropsTable rows={[['className', 'string', 'grille ex. col-50 col-100-sp']]} />
        <Code>{'<ul className="_row">\n  <ListItem className="col-50 col-100-sp">…</ListItem>\n</ul>'}</Code>

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
        <PropsTable rows={[
          ['label', 'string', 'pastille centrée (type de sortie)'],
          ['href', 'string (optionnel)', 'rend la carte cliquable (hover fill)'],
          ['ariaLabel', 'string', 'obligatoire si href (la carte n\'a pas de texte visible)']
        ]} />
        <Code>{'<Cover label="EP" href="https://…" ariaLabel="Vision — écouter" />\n<Cover label="Single" />'}</Code>

        <h3 className="_row">Logo</h3>
        <div className="__row" style={{ maxWidth: '8.33333rem' }}><Logo /></div>
        <PropsTable rows={[
          ['className', 'string', 'taille (ex. header-logo)'],
          ['label', 'string', 'aria-label (role="img")']
        ]} />
        <Code>{'<Logo />\n<Logo className="header-logo" />'}</Code>

        <h3 className="_row">Marquee</h3>
        <Marquee text="Exemple de marquee · Le Label Records" />
        <PropsTable rows={[['text', 'string', 'contenu répété 2× pour la boucle, aria-hidden="true"']]} />
        <Code>{'<Marquee text="K0RROBOR · Montevideo · Le Label² · Nîmes" />'}</Code>

        <h3 className="_row">Header</h3>
        <p className="__row textsize-small">
          Sticky, <strong>aucune nav en ligne</strong> : navigation uniquement via le bouton
          <code>Menu</code> (<code>.button.nav-toggle</code>, toutes tailles) qui ouvre le menu plein écran
          (<code>.site-nav.is-open</code>) en dialog modal (<code>role="dialog" aria-modal="true"</code>, page et footer
          <code>inert</code>, Échap ferme, focus sur le 1<sup>er</sup> lien puis rendu au bouton Menu).
          Au scroll, le header affiche la marque (<code>.header-brand</code> = logo + « Le Label Records »,
          classe <code>is-scrolled</code> posée par <code>Header.jsx</code> ; nom masqué ≤ 767px).
          Bouton thème « Appliquer le #… » à droite.
        </p>

        <h3 className="_row">Footer</h3>
        <p className="__row textsize-small">Fond plein accent, texte on-accent : nav du site, réseaux (depuis <code>config.social</code>), mention écolo. Focus ring adapté (<code>#footer :focus-visible</code>).</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-patterns" id="ds-patterns">
        <h2 id="ds-patterns">Patterns</h2>
        <ul className="_row">
          <ListItem><strong>Page type</strong> : <code>&lt;Hero&gt;</code> → <code>&lt;Lead&gt;</code> → sections <code>h2</code> séparées par <code>&lt;hr className="_row" /&gt;</code> (espaceur invisible).</ListItem>
          <ListItem><strong>Navigation</strong> : bouton Menu → dialog plein écran (voir Header) ; page active = remplie (<code>aria-current="page"</code>).</ListItem>
          <ListItem><strong>Fil d'actus</strong> : <code>ListItem</code> en 2 colonnes (<code>col-50 col-100-sp</code>), ligne <code>.list-date</code> = date — <code>&lt;Label&gt;</code> — <code>&lt;Button&gt;</code> inline.</ListItem>
          <ListItem><strong>Carte produit</strong> : <code>Cover</code> 2:3 + métadonnées (titre/artiste/date) + <code>.release-links</code>.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-voix" id="ds-voix">
        <h2 id="ds-voix">Voix &amp; contenu</h2>
        <ul className="_row">
          <ListItem><strong>Ton</strong> : direct, humain, sans jargon marketing — on parle aux artistes et au public comme en vrai.</ListItem>
          <ListItem><strong>Intitulés d'action explicites</strong> : « Accéder à nos émissions », « Appliquer le #343434 », « Envoyer une démo » — jamais « cliquez ici ».</ListItem>
          <ListItem><strong>Catégories</strong> : toujours préfixées d'un # (rendu par <code>&lt;Label&gt;</code>), jamais déguisées en boutons.</ListItem>
          <ListItem><strong>Dates</strong> : format fr-FR, « À venir » sans date ; tri chronologique inverse, les sans-date en dernier.</ListItem>
          <ListItem><strong>Contenu éditable</strong> : tout vient des JSON de <code>data/</code> (filtrés par <code>visible()</code>), jamais en dur dans les pages.</ListItem>
          <ListItem><strong>Liens descriptifs</strong> : le texte du lien dit l'action, jamais d'URL nue.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-a11y" id="ds-a11y">
        <h2 id="ds-a11y">Accessibilité (checklist WCAG AA)</h2>
        <ul className="_row">
          <ListItem>Landmarks : <code>header / nav aria-label / main#main / aside aria-label / footer</code> + skip-link « Aller au contenu » vers <code>#main tabIndex={-1}</code>.</ListItem>
          <ListItem>1 seul <code>h1.hero-title</code> par page ; sections nommées (<code>aria-labelledby</code>).</ListItem>
          <ListItem><code>:focus-visible</code> partout (outline 2px, couleur adaptée dans le footer) ; cibles ≥ 24px.</ListItem>
          <ListItem>Contraste : accent/bg 5.23:1 (AA), mono/bg 12.45:1 (AAA).</ListItem>
          <ListItem>Clavier complet : menu (focus 1<sup>er</sup> lien, Échap, retour du focus, <code>inert</code> derrière), onglets (roving tabindex + flèches), tous les liens atteignables.</ListItem>
          <ListItem>États exposés uniquement en ARIA : <code>aria-current / aria-selected / aria-pressed / aria-expanded / aria-modal</code>.</ListItem>
          <ListItem><code>prefers-reduced-motion</code> respecté globalement (animations, scroll, marquee).</ListItem>
          <ListItem>Contenus décoratifs masqués : marquee <code>aria-hidden</code>, logo du header <code>aria-hidden</code> (nom visible à côté).</ListItem>
          <ListItem>0 cookie / 0 traceur ; préférence de thème en localStorage uniquement.</ListItem>
          <ListItem>Vérification continue : panneau <strong>a11y (axe)</strong> dans Storybook sur chaque story.</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-eco" id="ds-eco">
        <h2 id="ds-eco">Écoconception &amp; perf</h2>
        <ul className="_row">
          <ListItem><strong>Zéro image raster</strong> : logo SVG en masque CSS (suit le thème), pochettes typographiques, SVG minifiés (svgo).</ListItem>
          <ListItem><strong>1 seule police</strong> : Archivo Variable latin, inlinée en data URI dans le CSS au build (1 requête en moins, rien à compresser en plus).</ListItem>
          <ListItem><strong>Zéro traceur / cookie / mesure d'audience</strong> ; le choix de thème reste en localStorage côté client.</ListItem>
          <ListItem><strong>Tout est auto-hébergé</strong> (CSS, JS, police, SVG) : aucune requête externe au runtime.</ListItem>
          <ListItem><strong>Compression</strong> gzip/brotli automatique au niveau de l'edge Cloudflare Pages ; assets minifiés (Vite) ; <code>print.css</code> dédié (RWEB_0031).</ListItem>
          <ListItem><strong>Budget de poids</strong> (build prod) : JS ≈ 95 Ko gzip, CSS ≈ 39 Ko gzip (police incluse), HTML ≈ 1 Ko ; dist ≈ 460 Ko.</ListItem>
          <ListItem><strong>Sécurité</strong> : <code>_headers</code> — CSP strict, HSTS, nosniff, frame-ancestors 'none' ; <code>security.txt</code> (RFC 9116) ; <code>npm audit</code> bloquant en CI (0 vulnérabilité).</ListItem>
          <ListItem><strong>CI bloquante</strong> : budgets de poids (<code>scripts/budget.mjs</code>), tests Storybook (addon-vitest + play), Lighthouse + budgets (<code>lighthouse-budget.json</code> : 0 font externe, 0 third-party).</ListItem>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-storybook" id="ds-storybook">
        <h2 id="ds-storybook">Vitrine Storybook</h2>
        <p className="_row textsize-regular-lh-small">
          Les primitives <code>ui/</code> sont servies en stories isolées (Storybook 10 + addon a11y + pages docs auto)
          sur GitHub Pages, hors du domaine principal (noindex) :
          <a href="https://lelabelrecords-stack.github.io/website/">lelabelrecords-stack.github.io/website</a>.
          Local : <code>npm run storybook</code> → http://localhost:6006 · build :
          <code>npm run build-storybook</code> → <code>storybook-static/</code> (déployé par
          <code>.github/workflows/storybook-pages.yml</code>).
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ds-guide" id="ds-guide">
        <h2 id="ds-guide">Ajouter un composant</h2>
        <ol className="_row">
          <ListItem>1. Token dans <code>tokens.scss</code> si valeur réutilisable (couleur, taille, espace, z-index…).</ListItem>
          <ListItem>2. Partial <code>src/styles/components/x.scss</code> + <code>@use</code> dans <code>main.scss</code>.</ListItem>
          <ListItem>3. Primitive <code>src/components/ui/X.jsx</code> (props explicites, états ARIA, aucune classe magique).</ListItem>
          <ListItem>4. Story dans <code>src/components/ui/ui.stories.jsx</code> + documentation dans cette page (rôle, props, états, a11y, règles).</ListItem>
          <ListItem>5. Vérifier : <code>npm run build</code> (le DS ne doit PAS apparaître dans le bundle prod) + <code>npm run build-storybook</code> + rendu SSR des routes (1 <code>h1.hero-title</code> par page).</ListItem>
        </ol>
      </section>
    </>
  )
}
