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
import BusinessCard from '../components/ui/BusinessCard.jsx'
import vcards from '../../data/vcards.json'
import { config } from '../data.js'

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
  ['ds-marque', 'Marque (logo)'],
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

      <section aria-labelledby="ds-principes" id="ds-principes" className="_row">
        <h2 id="ds-principes">Principes</h2>
        <ul className="_row">
          <ListItem><strong>Clarté</strong> — un seul <code>h1</code> par page, texte en couleur d'accent sur fond uni, chaque élément a un rôle évident.</ListItem>
          <ListItem><strong>Cohérence</strong> — tout passe par les tokens et les primitives <code>ui/</code> ; aucune valeur en dur dans une page.</ListItem>
          <ListItem><strong>Hiérarchie</strong> — la typographie fait le tri, niveaux h1→h4 sans saut : hero 900 géant (h1), h2 900 capitales ($fs-h2), h3 900 $fs-h3 1.25rem, h4 700, lead 900 fluide, corps 400, métadonnées small.</ListItem>
          <ListItem><strong>Accessibilité</strong> — WCAG AA : contraste mesuré, focus visible, clavier complet, ARIA sémantique, reduced-motion.</ListItem>
          <ListItem><strong>Écoconception</strong> — 0 image raster, 1 police inlinée, 0 traceur, poids mini, compression edge.</ListItem>
        </ul>
      </section>

      <section aria-labelledby="ds-couleur" id="ds-couleur" className="_row">
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
            ['Thème', 'data-theme + localStorage', 'Bouton « Passer en mono / rouge » dans le header (pastille = couleur cible), anti-FOUC via theme.js']
          ]}
        />
        <Regles
          faire="utiliser uniquement var(--accent), var(--bg), var(--on-accent) — le thème suit partout, y compris le logo (masque CSS)."
          eviter="aucun code hex en dur dans un composant ou une page (les swatches de cette page sont la seule exception)."
        />
      </section>

      <section aria-labelledby="ds-typo" id="ds-typo" className="_row">
        <h2 id="ds-typo">Typographie</h2>
        <p className="_row textsize-small">
          Une seule police : <strong>Archivo Variable</strong> (graisses 100–900, 1 woff2 latin inliné en data URI dans le CSS).
          Base 12px (14px ≥ 1700px). Le display utilise la graisse 900 (<code>$font-black</code>).
        </p>
        <PropsTable
          rows={[
            ['$fs-hero', 'clamp(3.5rem, 14vw, 12rem)', 'h1.hero-title — 1 par page, via <Hero>'],
            ['$fs-lead', 'clamp(1.5rem, 3.2vw, 2.5rem)', 'chapô, via <Lead> (graisse 900, lh 1.15)'],
            ['$fs-h2', 'clamp(1.5rem, 3.2vw, 2.5rem)', 'h2 — titre de section : graisse 900 $font-black, capitales, lh 1.1 (mise en évidence 100 % typographique, sans filet)'],
            ['$fs-h3', '1.25rem', 'h3 — sous-section : graisse 900 $font-black, lh 1.15, sans capitales (reste sous le h2) ; h4 = 700 au niveau du corps'],
            ['$fs-card-title', '1.25rem', 'intitulé des cartes produit (.release-title : 900, capitales)'],
            ['$fs-image-label', 'clamp(1rem, 2.2vw, 1.75rem)', 'pastille Cover (.image-label : 900, capitales, ellipsis si trop long)'],
            ['$fs-regular', '1rem', 'corps de texte (lh $lh-regular 1.667)'],
            ['$fs-marquee', '1.25rem', 'bandeau défilant (graisse 900, capitales)'],
            ['$fs-small', '0.83333rem', 'métadonnées (0.667rem ≤ 767px), lh $lh-small 1.25']
          ]}
        />
        <p className="hero-title _row">Hero title</p>
        <Lead className="__row">Exemple de lead — graisse 900, taille fluide.</Lead>
        <h2 className="__row">h2 — titre de section (900, capitales)</h2>
        <h3 className="__row">h3 — sous-section (900, 1.25rem)</h3>
        <h4 className="__row">h4 — dernier niveau de titre (700, 1rem)</h4>
        <p className="__row">Paragraphe standard (Archivo 400, 1rem / 1.667).</p>
        <p className="__row textsize-regular-lh-small">textsize-regular-lh-small (1rem / 1.25).</p>
        <p className="__row textsize-small">textsize-small (0.833rem / 1.25, 0.667rem sur mobile).</p>
        <Regles
          faire="choisir la taille dans l'échelle $fs-* et la graisse selon le rôle (900 = display uniquement)."
          eviter="aucune taille hors échelle, aucun font-size en dur, aucune deuxième police, aucun saut de niveau h1→h2→h3→h4."
        />
      </section>

      <section aria-labelledby="ds-grille" id="ds-grille" className="_row">
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
            ['Séparation des blocs', 'jamais de <hr>', 'aucun filet horizontal : l\'espacement vertical suffit, via la classe spacer posée sur le bloc suivant (ex. section._row)']
          ]}
        />
        <Regles
          faire="espacer exclusivement avec les classes de $spaces posées sur le bloc suivant (section._row…), poser la grille avec .flex-container + .col-*."
          eviter="aucun margin/padding custom en px, aucun <hr> du tout (ni filet ni espaceur), aucune grille parallèle."
        />
      </section>

      <section aria-labelledby="ds-visuels" id="ds-visuels" className="_row">
        <h2 id="ds-visuels">Visuels</h2>
        <ul className="_row">
          <ListItem><strong>Zéro image raster</strong> : le logo est un masque CSS (<code>.logo-svg</code>, suit var(--accent)), les pochettes sont des blocs typographiques (<code>Cover</code>).</ListItem>
          <ListItem><strong>Proportions</strong> : <code>.image-container</code> = 3:2 (bannière), <code>.is-product</code> = 2:3 (carte). Contour 1px <code>.cover--red</code>, rempli au survol/focus (<code>.hover-image</code>).</ListItem>
          <ListItem><strong>Pastille</strong> : <code>.image-label</code> centrée sur le visuel = nom de l'artiste, en display (<code>$fs-image-label</code> clamp(1–1.75rem), graisse 900, capitales), ellipsis si dépassement (max-width 92 %).</ListItem>
          <ListItem><strong>SVG</strong> : minifiés (svgo), auto-hébergés, <code>stroke: currentColor</code> quand ils servent de masque.</ListItem>
        </ul>
        <Regles
          faire="tout visuel est un composant (Cover, Logo) ou un SVG vectoriel auto-hébergé."
          eviter="aucune photo/JPG/PNG, aucun SVG externe, aucun <img> sans alternative textuelle équivalente."
        />
      </section>

      <section aria-labelledby="ds-marque" id="ds-marque" className="_row">
        <h2 id="ds-marque">Marque (logo)</h2>
        <ul className="_row">
          <ListItem><strong>Charte graphique = ce DS</strong> : couleurs, typo, grille et logo y sont documentés ; les sources du logo se téléchargent ici.</ListItem>
          <ListItem><strong>Fichiers sources</strong> (auto-hébergés, SVG minifiés, attribut <code>download</code>) : <a href="/assets/logo-contour-rouge.svg" download>logo-contour-rouge.svg</a> (contour, <code>stroke: currentColor</code> → se recolore en CSS) · <a href="/assets/logo-contour-rouge-blanc.svg" download>logo-contour-rouge-blanc.svg</a> (blanc <code>#fff</code>, pour fond plein accent).</ListItem>
          <ListItem><strong>Variantes</strong> : rouge <code>#DB0000</code> sur blanc (défaut) · mono <code>#343434</code> (thème <code>data-theme</code>) · blanc sur fond accent (<code>.logo-svg--on-accent</code>). Dans le site, <code>&lt;Logo&gt;</code> suit <code>var(--accent)</code> via masque CSS.</ListItem>
          <ListItem><strong>Ratio</strong> : <code>viewBox 571.799 × 763.875</code>, toujours conservé (<code>aspect-ratio</code> dans logo.scss) — jamais de déformation.</ListItem>
          <ListItem><strong>Éco</strong> : SVG uniquement, aucun PNG/JPG (contrat 0 raster). Un kit presse PNG reste une option documentée non retenue (README).</ListItem>
        </ul>
        <div className="flex-container _row">
          <div className="col-25 col-50-sp">
            <div className="ds-box"><div style={{ maxWidth: '6.66667rem', margin: '0 auto' }}><Logo /></div></div>
            <p className="____row textsize-small">Rouge sur blanc (défaut)</p>
          </div>
          <div className="col-25 col-50-sp">
            <div className="ds-box" style={{ backgroundColor: 'var(--accent)' }}><div style={{ maxWidth: '6.66667rem', margin: '0 auto' }}><Logo className="logo-svg--on-accent" label="Le Label Records — blanc sur fond accent" /></div></div>
            <p className="____row textsize-small">Blanc sur fond accent (.logo-svg--on-accent)</p>
          </div>
        </div>
        <Regles
          faire="dans le site : <Logo> uniquement. En externe (presse, partenaires) : télécharger les SVG ci-dessus, sur fond uni, ratio conservé."
          eviter="aucune recoloration hors var(--accent)/#fff, aucune déformation, ombre, arrondi, rotation ou contour modifié — et aucun PNG/JPG."
        />
      </section>

      <section aria-labelledby="ds-motion" id="ds-motion" className="_row">
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

      <section aria-labelledby="ds-tokens" id="ds-tokens" className="_row">
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
            ['$fs-hero / $fs-h2 / $fs-h3 / $fs-lead / $fs-regular / $fs-marquee / $fs-card-title / $fs-image-label / $fs-small', 'clamp / rem', 'échelle typographique (voir Typographie)'],
            ['$lh-regular / $lh-small', 'rem', '1.667rem / 1.25rem'],
            ['$bw', '1px', 'unique épaisseur de filet (cadres : Cover, boutons, pastille ; focus 2px) — aucun <hr>, aucun filet de liste'],
            ['$radius', '0', 'aucun arrondi, partout'],
            ['$z-header / $z-menu / $z-actions / $z-skip', '40 / 50 / 60 / 100', 'ordre des couches'],
            ['$dur', '0.2s', 'unique durée de transition']
          ]}
        />
      </section>

      <section aria-labelledby="ds-composants" id="ds-composants" className="_row">
        <h2 id="ds-composants">Composants (ui/)</h2>
        <p className="_row textsize-small">Chaque composant a un partial SCSS dédié (<code>styles/components/*.scss</code>) et une story Storybook.</p>

        <h3 className="_row">Hero</h3>
        <PropsTable rows={[
          ['title', 'node', 'contenu du seul h1.hero-title de la page'],
          ['sub', 'node (optionnel)', 'sous-titre hero-sub'],
          ['actions', 'node (optionnel)', 'CTA du hero, rendus dans .hero-actions (ex. accueil : « Voir les sorties », « Écouter le dernier épisode » en <Button>)']
        ]} />
        <Regles faire="un <Hero> par page, en premier dans #main ; sur l'accueil, des CTA via actions." eviter="jamais de deuxième h1, jamais de h1 hors <Hero>." />
        <Code>{'<Hero title="Sorties" />\n<Hero title={<>Le Label<br />Records</>} sub="Label indépendant — Nîmes, France" actions={<>\n  <Button to="/sorties">Voir les sorties</Button>\n  <Button href="https://…" target="_blank" rel="noopener noreferrer">Écouter le dernier épisode</Button>\n</>} />'}</Code>

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
          Tout lien externe (<code>target="_blank"</code>) affiche automatiquement <strong>↗</strong> : en ligne après le texte pour un lien inline (règle globale <code>a[target='_blank']::after</code> dans base.scss), et dans le <strong>coin interne supérieur droit</strong> sur un <code>&lt;Button&gt;</code> (<code>.button[target='_blank']::after</code> positionné absolu dans button.scss).
        </p>
        <Regles
          faire="toute action/lien de navigation passe par <Button> — y compris dans .release-links des cartes produit."
          eviter={'aucune ancre <code>className="button"</code> écrite à la main, aucun border-radius.'}
        />
        <Code>{'<Button to="/contact">Contact</Button>\n<Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Bandcamp</Button>'}</Code>

        <h3 className="_row">Label</h3>
        <p className="__row"><Label>concert</Label> <Label filled>release</Label></p>
        <PropsTable rows={[
          ['filled', 'bool', 'version pleine (fond accent)'],
          ['children', 'node', 'texte de l\'étiquette — rendu précédé d\'un # automatique']
        ]} />
        <Regles faire="pour les catégories/étiquettes ; inline-block + vertical-align: middle, donc toujours aligné avec un <Button> inline sur la même ligne (ex. .list-date)." eviter="jamais comme bouton cliquable (pas de onClick sur un Label)." />

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
          <ListItem>Exemple d'élément de liste — croisillon « + » en tête, 1.5em 900 (<code>.list-item > :first-child::before</code>), aucun filet : le padding et le marqueur séparent les éléments (règle « sans limite visuelle »).</ListItem>
        </ul>
        <PropsTable rows={[['className', 'string', 'grille ex. col-50 col-100-sp']]} />
        <Code>{'<ul className="_row">\n  <ListItem className="col-50 col-100-sp">…</ListItem>\n</ul>'}</Code>

        <h3 className="_row">BusinessCard (carte de visite)</h3>
        <div className="__row" style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
          {vcards.people.map((person) => (
            <BusinessCard key={person.slug} person={person} />
          ))}
        </div>
        <PropsTable rows={[
          ['person', 'objet', 'entrée de data/vcards.json : slug, first, last, fn, title, email, tel, telE164 — photo servie sur /vcard/<slug>.jpg, vCard sur /vcard/<slug>.vcf']
        ]} />
        <p className="__row textsize-small">
          Carte de visite digitale du label : contour 1px, photo carrée, nom en display, rôle, verbatim, contacts (email, tél, adresse, émission Le Label² sur Rayvox / Raje Radio / Radio Alliance+).
          CTA unique « Ajouter à mes contacts » = téléchargement du .vcf statique servi sur <code>/vcard/</code> (UTF-8 via <code>_headers</code>, <code>PHOTO</code> embarquée en base64 brut RFC 6350).
          Les pages statiques <code>/vcard/</code> (index + 2 cartes, copiées depuis le dépôt <code>vcard</code>) reprennent la même mise en page en HTML autonome.
        </p>
        <Regles
          faire="une carte par personne, CTA unique « Ajouter à mes contacts » pointant vers /vcard/<slug>.vcf."
          eviter={'pas de second bouton « télécharger » (doublon), pas de lien de pied de carte, pas de génération côté client (le .vcf statique embarque déjà la photo).'}
        />
        <Code>{'<BusinessCard person={vcards.people[0]} />\n<BusinessCard person={vcards.people[1]} />'}</Code>

        <h3 className="_row">Cover (carte produit)</h3>
        <div className="flex-container __row">
          <div className="col-25 col-50-sp">
            <Cover label="Montevideo" href="https://lelabelrecords.bandcamp.com/" ariaLabel="Vision / Montevideo — écouter" />
            <p className="____row release-title"><strong>Vision</strong> / Montevideo</p>
            <p className="____row textsize-small">EP · 16 octobre 2026</p>
          </div>
          <div className="col-25 col-50-sp">
            <Cover label="KØRROBOR" />
            <p className="____row release-title"><strong>EP1</strong> / KØRROBOR</p>
            <p className="____row textsize-small">EP · 18 décembre 2026</p>
          </div>
        </div>
        <PropsTable rows={[
          ['label', 'string', 'pastille centrée = nom de l\'artiste (regroupe les sorties d\'un même artiste ; le type EP/Single/LP est en métadonnée, ligne « type · date »)'],
          ['href', 'string (optionnel)', 'rend la carte cliquable (hover fill)'],
          ['ariaLabel', 'string', 'obligatoire si href (la carte n\'a pas de texte visible)']
        ]} />
        <Code>{'<Cover label="Montevideo" href="https://…" ariaLabel="Vision / Montevideo — écouter" />\n<Cover label="KØRROBOR" />'}</Code>

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
        <Code>{'<Marquee text="KØRROBOR · Montevideo · Le Label² · Nîmes" />'}</Code>

        <h3 className="_row">Header</h3>
        <p className="__row textsize-small">
          Sticky, <strong>aucune nav en ligne</strong> : navigation uniquement via le bouton
          <code>Menu</code> (<code>.button.nav-toggle</code>, toutes tailles) qui ouvre le menu plein écran
          (<code>.site-nav.is-open</code>) en dialog modal (<code>role="dialog" aria-modal="true"</code>, page et footer
          <code>inert</code>, Échap ferme, focus sur le 1<sup>er</sup> lien puis rendu au bouton Menu).
          Au scroll, le header affiche la marque (<code>.header-brand</code> = logo + « Le Label Records »,
          classe <code>is-scrolled</code> posée par <code>Header.jsx</code> ; nom masqué ≤ 767px).
          Bouton thème « Passer en mono / rouge » à droite (pastille = couleur cible via <code>--toggle-target</code>, <code>aria-pressed</code>) ; au survol/focus, fond = couleur cible et texte = <code>var(--on-accent)</code>.
        </p>

        <h3 className="_row">Footer</h3>
        <p className="__row textsize-small">Fond plein accent, texte on-accent, <strong>compact</strong> : padding 2.08333rem (1.5rem ≤ 767px), deux colonnes équilibrées — nav du site en lignes resserrées (<code>.footer-nav ul</code> flex wrap, gap 5px 20px) à gauche, 3 lignes à droite (<code>.footer-info</code> : « nom — baseline » / adresse · email / liens externes depuis <code>config.social</code> + « Design system ↗ » depuis <code>config.design_system_url</code> — au même niveau que les autres liens), puis <code>.footer-bottom</code> (© + mention éco seulement). Focus ring adapté (<code>#footer :focus-visible</code>). Masqué à l’impression (<code>print.css</code>).</p>
      </section>

      <section aria-labelledby="ds-patterns" id="ds-patterns" className="_row">
        <h2 id="ds-patterns">Patterns</h2>
        <ul className="_row">
          <ListItem><strong>Page type</strong> : <code>&lt;Hero&gt;</code> → <code>&lt;Lead&gt;</code> → sections <code>h2</code> séparées par l’espacement seul : classe spacer sur la section suivante (ex. <code>&lt;section className="_row"&gt;</code>) — jamais de <code>&lt;hr&gt;</code>.</ListItem>
          <ListItem><strong>Navigation</strong> : bouton Menu → dialog plein écran (voir Header) ; page active = remplie (<code>aria-current="page"</code>).</ListItem>
          <ListItem><strong>Fil d'actus</strong> : <code>ListItem</code> en 3 colonnes (<code>col-33 col-100-sp</code>), ligne <code>.list-date</code> en <strong>italique</strong> = date — <code>&lt;Label&gt;</code> — <code>&lt;Button&gt;</code> inline (Label et Button restent droits). Jamais d'événement passé dans le fil (helper <code>upcomingEvents</code>) et jamais de bouton sans lien (actu sans <code>link</code> = pas de bouton).</ListItem>
          <ListItem><strong>Carte produit</strong> : <code>Cover</code> 2:3 (pastille = artiste) + intitulé <code>.release-title</code> (« titre / artiste », 900 capitales $fs-card-title 1.25rem) + méta « type · date » + <code>.release-links</code> en <code>&lt;Button&gt;</code>.</ListItem>
          <ListItem><strong>Accueil</strong> : <code>&lt;Hero&gt;</code> avec <code>actions</code> (CTA) → marquee → fil d'actus (onglets, <code>flex-wrap</code> donc jamais de débordement mobile) → 3 dernières sorties → bloc radio en 3 colonnes (<code>col-33</code>). Le logo latéral reste visible partout, y compris sur l'accueil (coexiste avec le h1 du hero) ; au scroll, le header affiche en plus la marque compacte.</ListItem>
          <ListItem><strong>Événements</strong> : sections « Prochains » / « Passés » (<code>upcomingEvents</code> / <code>pastEvents</code>) ; libellé de lien explicite via <code>eventLinkLabel</code> (« Billetterie » pour un concert, « Infos » sinon, <code>linkLabel</code> pour surcharger).</ListItem>
          <ListItem><strong>Radio</strong> : antennes en 3 colonnes (<code>flex-container</code> + <code>col-33 col-100-sp</code>, comme le bloc radio de l’accueil), bouton « Écouter sur &lt;diffuseur&gt; » par antenne ; la liste des épisodes est aussi en 3 colonnes ; épisode avec <code>link</code> → bouton « Écouter l’épisode ».</ListItem>
          <ListItem><strong>Liens externes</strong> : <code>target="_blank"</code> + <code>rel="noopener noreferrer"</code> + ↗ automatique.</ListItem>
        </ul>
      </section>

      <section aria-labelledby="ds-voix" id="ds-voix" className="_row">
        <h2 id="ds-voix">Voix &amp; contenu</h2>
        <ul className="_row">
          <ListItem><strong>Ton</strong> : direct, humain, sans jargon marketing — on parle aux artistes et au public comme en vrai.</ListItem>
          <ListItem><strong>Intitulés d'action explicites</strong> : « Voir les sorties », « Écouter sur Rayvox », « Billetterie », « Passer en mono », « Envoyer une démo » — jamais « cliquez ici », jamais « Lien ».</ListItem>
          <ListItem><strong>Jamais de bouton sans destination</strong> : une actu sans lien n'a pas de bouton.</ListItem>
          <ListItem><strong>Catégories</strong> : toujours préfixées d'un # (rendu par <code>&lt;Label&gt;</code>), jamais déguisées en boutons.</ListItem>
          <ListItem><strong>Dates</strong> : format fr-FR, « À venir » sans date ; tri chronologique inverse, les sans-date en dernier.</ListItem>
          <ListItem><strong>Contenu éditable</strong> : tout vient des JSON de <code>data/</code> (filtrés par <code>visible()</code>), jamais en dur dans les pages.</ListItem>
          <ListItem><strong>Liens descriptifs</strong> : le texte du lien dit l'action, jamais d'URL nue.</ListItem>
        </ul>
      </section>

      <section aria-labelledby="ds-a11y" id="ds-a11y" className="_row">
        <h2 id="ds-a11y">Accessibilité (checklist WCAG AA)</h2>
        <ul className="_row">
          <ListItem>Landmarks : <code>header / nav aria-label / main#main / aside aria-label / footer</code> + skip-link « Aller au contenu » vers <code>#main tabIndex={-1}</code>.</ListItem>
          <ListItem>1 seul <code>h1.hero-title</code> par page ; sections nommées (<code>aria-labelledby</code>). ; hiérarchie h1→h4 respectée, sans saut de niveau.</ListItem>
          <ListItem><code>:focus-visible</code> partout (outline 2px, couleur adaptée dans le footer) ; cibles ≥ 24px.</ListItem>
          <ListItem>Contraste : accent/bg 5.23:1 (AA), mono/bg 12.45:1 (AAA).</ListItem>
          <ListItem>Clavier complet : menu (focus 1<sup>er</sup> lien, Échap, retour du focus, <code>inert</code> derrière), onglets (roving tabindex + flèches), tous les liens atteignables.</ListItem>
          <ListItem>États exposés uniquement en ARIA : <code>aria-current / aria-selected / aria-pressed / aria-expanded / aria-modal</code>.</ListItem>
          <ListItem><code>prefers-reduced-motion</code> respecté globalement (animations, scroll, marquee).</ListItem>
          <ListItem>Contenus décoratifs masqués : marquee <code>aria-hidden</code>, logo du header <code>aria-hidden</code> (nom visible à côté).</ListItem>
          <ListItem>Liens externes signalés visuellement : ↗ automatique sur <code>target="_blank"</code>.</ListItem>
          <ListItem>0 cookie / 0 traceur ; préférence de thème en localStorage uniquement.</ListItem>
          <ListItem>Vérification continue : panneau <strong>a11y (axe)</strong> dans Storybook sur chaque story.</ListItem>
        </ul>
      </section>

      <section aria-labelledby="ds-eco" id="ds-eco" className="_row">
        <h2 id="ds-eco">Écoconception &amp; perf</h2>
        <ul className="_row">
          <ListItem><strong>Zéro image raster</strong> : logo SVG en masque CSS (suit le thème), pochettes typographiques, SVG minifiés (svgo).</ListItem>
          <ListItem><strong>1 seule police</strong> : Archivo Variable latin, inlinée en data URI dans le CSS au build (<code>assetsInlineLimit: 64 Ko</code>) — aucune requête font, donc aucune ressource « compressible » à signaler (RWEB_0076). Garde-fou CI : <code>scripts/budget.mjs</code> échoue si un fichier <code>.woff2/.woff/.ttf/.otf/.eot</code> est présent dans <code>dist/</code>.</ListItem>
          <ListItem><strong>Zéro traceur / cookie / mesure d'audience</strong> ; le choix de thème reste en localStorage côté client.</ListItem>
          <ListItem><strong>Tout est auto-hébergé</strong> (CSS, JS, police, SVG) : aucune requête externe au runtime.</ListItem>
          <ListItem><strong>Compression</strong> (RWEB_0076) : gzip/brotli automatique à l'edge Cloudflare Pages sur tout le texte (HTML, CSS, JS, SVG, XML, txt) ; assets minifiés par Vite ; jamais de fichier police servi séparément (data URI).</ListItem>
          <ListItem><strong>Impression</strong> (RWEB_0031) : <code>public/print.css</code> lié par <code>&lt;link rel="stylesheet" media="print"&gt;</code> dans <code>index.html</code> — masque header, footer, barre latérale, menu plein écran, boutons et images ; contenu en noir sur blanc, sans fond (économie d'encre).</ListItem>
          <ListItem><strong>Budget de poids</strong> (build prod) : JS ≈ 95 Ko gzip, CSS ≈ 39 Ko gzip (police incluse), HTML ≈ 1 Ko ; dist ≈ 460 Ko.</ListItem>
          <ListItem><strong>Sécurité</strong> : <code>_headers</code> — CSP strict, HSTS, nosniff, frame-ancestors 'none' ; <code>security.txt</code> (RFC 9116) ; <code>npm audit</code> bloquant en CI (0 vulnérabilité).</ListItem>
          <ListItem><strong>CI bloquante</strong> : budgets de poids (<code>scripts/budget.mjs</code>), tests Storybook (addon-vitest + play), Lighthouse + budgets (<code>lighthouse-budget.json</code> : 0 font externe, 0 third-party).</ListItem>
        </ul>
      </section>

      <section aria-labelledby="ds-storybook" id="ds-storybook" className="_row">
        <h2 id="ds-storybook">Vitrine Storybook</h2>
        <p className="_row textsize-regular-lh-small">
          Les primitives <code>ui/</code> sont servies en stories isolées (Storybook 10 + addon a11y + pages docs auto)
          sur GitHub Pages, hors du domaine principal (noindex) :
          <a href={config.design_system_url} target="_blank" rel="noopener noreferrer">lelabelrecords-stack.github.io/website</a>
          — référencée depuis le pied de page du site, au même niveau que les liens externes (ligne <code>.footer-info</code>, URL dans <code>config.design_system_url</code>).
          Local : <code>npm run storybook</code> → http://localhost:6006 · build :
          <code>npm run build-storybook</code> → <code>storybook-static/</code> (déployé par
          <code>.github/workflows/storybook-pages.yml</code>).
        </p>
      </section>

      <section aria-labelledby="ds-guide" id="ds-guide" className="_row">
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
