import { config, artistes } from '../data.js'
import ListItem from '../components/ui/ListItem.jsx'

export default { title: 'Le Label Records/Welcome' }

export const Bienvenue = () => (
  <div style={{ maxWidth: '46rem' }}>
    <h1 className="hero-title">Le Label<br />Records</h1>
    <p className="lead _row">{config.baseline}</p>

    <h2 className="_row">Qui on est</h2>
    <p className="__row textsize-regular-lh-small">
      {config.label_name} est un <strong>label indépendant basé à Nîmes</strong> ({config.address}),
      co-dirigé par Christophe et Roxane. Au roster :{' '}
      {artistes.map((a) => `${a.name} (${a.genre}, ${a.ville})`).join(' · ')}.
      On produit aussi l'émission radio <strong>{config.radio.name}</strong> — {config.radio.tagline}{' '}
      Contact : <a href={`mailto:${config.email}`}>{config.email}</a>.
    </p>

    <h2 className="_row">Pourquoi ce design system</h2>
    <ul className="__row">
      <ListItem><strong>Une seule source de vérité</strong> : tokens (`tokens.scss`) → partials SCSS → primitives `ui/` → ce Storybook. On ne design pas deux fois la même chose.</ListItem>
      <ListItem><strong>Une identité forte et tenue</strong> : brutaliste, rouge `#DB0000` (ou `#343434`) sur blanc, grille stricte, 1 police, 0 arrondi — chaque page du site suit les mêmes lois.</ListItem>
      <ListItem><strong>L'écoconception</strong> : 0 image raster, 1 police inlinée en data URI, 0 traceur, ~460 Ko de dist. Le DS documente le budget de poids et on le tient.</ListItem>
      <ListItem><strong>L'accessibilité</strong> : WCAG AA (contrastes mesurés 5.23:1 / 12.45:1), clavier complet, ARIA sémantique, reduced-motion — vérifiable ici via le panneau a11y de chaque story.</ListItem>
      <ListItem><strong>La simplicité</strong> : 9 primitives suffisent à tout le site. Pas besoin de 50 composants.</ListItem>
    </ul>

    <h2 className="_row">Liens</h2>
    <ul className="__row">
      <ListItem><strong>Site</strong> : <a href="https://le-label.org">le-label.org</a> (aperçu : <a href="https://website-1zw.pages.dev">website-1zw.pages.dev</a>)</ListItem>
      <ListItem><strong>Contrat écrit du DS</strong> : <code>npm run dev</code> → http://localhost:5173/design-system (dev-only, non embarqué en prod)</ListItem>
      <ListItem><strong>Ce Storybook</strong> : GitHub Pages (noindex) ; local : <code>npm run storybook</code> → http://localhost:6006</ListItem>
    </ul>

    <h2 className="_row">Sommaire</h2>
    <ul>
      <li className="list-item"><strong>Welcome</strong> — Bienvenue · Principes · Démarrer</li>
      <li className="list-item"><strong>Fondations</strong> — Couleur · Typographie · Grille · Espacement · Motion</li>
      <li className="list-item"><strong>Composants</strong> — Button · Label · Tab · Cover · Logo · Hero · Lead · ListItem · Marquee (Docs + Contrôles + a11y)</li>
      <li className="list-item"><strong>Patterns</strong> — Page Type · Fil Actus · Carte Produit</li>
    </ul>
  </div>
)

export const Principes = () => (
  <div style={{ maxWidth: '46rem' }}>
    <h2 className="hero-title" style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>Principes</h2>
    <ul className="_row">
      <ListItem><strong>Clarté</strong> — un seul h1 par page, texte en couleur d'accent, chaque élément a un rôle évident.</ListItem>
      <ListItem><strong>Cohérence</strong> — tout passe par les tokens et les primitives ui/ ; aucune valeur en dur.</ListItem>
      <ListItem><strong>Hiérarchie</strong> — hero 900 géant, lead 900 fluide, corps 400, métadonnées small.</ListItem>
      <ListItem><strong>Accessibilité</strong> — WCAG AA : contraste mesuré, focus visible, clavier complet, ARIA, reduced-motion.</ListItem>
      <ListItem><strong>Écoconception</strong> — 0 image raster, 1 police inlinée, 0 traceur, poids mini.</ListItem>
    </ul>
  </div>
)

export const Demarrer = () => (
  <div style={{ maxWidth: '46rem' }}>
    <h2 className="hero-title" style={{ fontSize: 'clamp(2rem,6vw,4rem)' }}>Démarrer</h2>
    <ul className="_row">
      <ListItem><code>npm ci</code> puis <code>npm run storybook</code> → http://localhost:6006</ListItem>
      <ListItem><code>npm run build-storybook</code> → <code>storybook-static/</code> (noindex ; déployé par <code>.github/workflows/storybook-pages.yml</code>)</ListItem>
      <ListItem>Nouveau composant : token → partial SCSS → <code>ui/X.jsx</code> → <code>X.stories.jsx</code> ici → doc dans <code>/design-system</code></ListItem>
      <ListItem>Tests : <code>npm run build</code> (site) + rendu SSR (1 h1.hero-title par route) + panneau a11y sur chaque story</ListItem>
    </ul>
  </div>
)
