# Contribuer

## Règles du design system (obligatoires)

Toute évolution UI passe par le DS, dans cet ordre :

1. **Token** dans `src/styles/tokens.scss` si la valeur est réutilisable (couleur, taille, espace, z-index…).
2. **Partial** `src/styles/components/x.scss` + `@use` dans `src/styles/main.scss` (1 partial = 1 primitive).
3. **Primitive** `src/components/ui/X.jsx` (props explicites, états ARIA, aucune classe magique, `border-radius: 0`, couleurs 100 % `var(--*)`).
4. **Story** `src/components/ui/X.stories.jsx` (arborescence « Le Label Records/Composants/X », autodocs, variantes, play test si interaction).
5. **Doc** dans `/design-system` (dev : `npm run dev` → http://localhost:5173/design-system) : rôle, props, états, a11y, règles à faire/à éviter.

Contenu éditable : uniquement `data/*.json` (jamais en dur dans les pages).

## Vérifications avant push

```bash
npm run build            # build site
npm run test:budget      # poids (JS ≤ 100 Ko gzip, dist ≤ 512 Ko…)
npm run build-storybook  # build DS
npm run test:storybook   # tests Storybook (addon-vitest + playwright) — en CI
```

+ rendu SSR des routes (1 `h1.hero-title` par page) et checklist a11y (clavier, focus, contrastes, reduced-motion).

## Process

- branche `vibe/<sujet>` → PR (template `.github/PULL_REQUEST_TEMPLATE.md`) → merge sur `main`.
- `main` est protégée (pas de force-push) ; Dependabot ouvre des PR hebdo pour les deps.
- Chaque release taguée : `git tag vX.Y.Z && git push origin vX.Y.Z` (voir CHANGELOG.md). Rollback Cloudflare Pages : Deployments → Revert.
- Déploiement : push sur `main` → miroir GitLab → build natif Cloudflare Pages → `le-label.org` ; Storybook → GitHub Pages via Actions.
