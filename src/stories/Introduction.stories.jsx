export default { title: '0. Introduction' }

export const Accueil = () => (
  <div style={{ maxWidth: '46rem' }}>
    <h1 className="hero-title">Design system</h1>
    <p className="lead _row">Le Label Records — vitrine interactive des primitives <code>src/components/ui/</code>.</p>
    <ul className="_row">
      <li className="list-item"><strong>Site</strong> : <a href="https://le-label.org">le-label.org</a> (aperçu : <a href="https://website-1zw.pages.dev">website-1zw.pages.dev</a>)</li>
      <li className="list-item"><strong>Contrat écrit du DS</strong> : <code>npm run dev</code> → http://localhost:5173/design-system (dev-only, non embarqué en prod)</li>
      <li className="list-item"><strong>Ce Storybook en local</strong> : <code>npm run storybook</code> → http://localhost:6006</li>
    </ul>
    <h2 className="_row">Sommaire</h2>
    <ul>
      <li className="list-item"><strong>1. Fondations</strong> — couleur (contrastes mesurés), typographie, grille, espacement, motion</li>
      <li className="list-item"><strong>2. Composants</strong> — Button, Label, Tab, Cover, Logo, Hero, Lead, ListItem, Marquee : onglet <em>Docs</em> (props) + <em>Contrôles</em> + panneau <em>a11y</em> sur chaque story</li>
      <li className="list-item"><strong>3. Patterns</strong> — page type, fil d'actus, carte produit</li>
    </ul>
    <p className="_row textsize-small">Règle : toute nouvelle primitive = token → partial SCSS → <code>ui/X.jsx</code> → story <code>X.stories.jsx</code> ici → doc dans <code>/design-system</code>.</p>
  </div>
)
