## Résumé
- Quoi ? Pourquoi ?

## Type de changement
- [ ] UI (passe par le DS : token → partial `components/*.scss` → primitive `ui/*.jsx` → story → doc `/design-system`)
- [ ] Contenu (`data/*.json`)
- [ ] Infra / CI / doc
- [ ] Fix a11y / perf / sécu

## Vérifications
- [ ] `npm run build` OK
- [ ] `npm run test:budget` OK (poids)
- [ ] `npm run build-storybook` OK si le DS est touché
- [ ] Rendu SSR des routes OK (1 `h1.hero-title` par page)
- [ ] a11y : clavier, focus, contrastes, reduced-motion
