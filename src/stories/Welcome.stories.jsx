import ListItem from '../components/ui/ListItem.jsx'

export default { title: 'Le Label Records/Welcome' }

export const Bienvenue = () => (
  <div style={{ maxWidth: '46rem' }}>
    <h1 className="hero-title">Design system</h1>
    <p className="lead _row">Le Label Records — vitrine interactive des primitives <code>src/components/ui/</code> (Storybook 10 + a11y + Docs auto).</p>
    <ul className="_row">
      <li className="list-item"><strong>Site</strong> : <a href="https://le-label.org">le-label.org</a> (aperçu : <a href="https://website-1zw.pages.dev">website-1zw.pages.dev</a>)</li>
      <li className="list-item"><strong>Contrat écrit du DS</strong> : <code>npm run dev</code> → http://localhost:5173/design-system (dev-only, non embarqué en prod)</li>
      <li className="list-item"><strong>Ce Storybook</strong> : déployé sur GitHub Pages (noindex) ; en local : <code>npm run storybook</code> → http://localhost:6006</li>
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
