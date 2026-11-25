# Changelog

Format [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnage sémantique.

## [Unreleased]

### Ajouté
- Contrat écoconception documenté dans le DS (page `/design-system` en dev + Storybook → Fondations → « Écoconception ») : RWEB_0031 (`print.css` : chrome et images masqués à l'impression, noir sur blanc) et RWEB_0076 (brotli edge Cloudflare sur tout le texte, police inlinée en data URI → 0 requête font).
- Garde-fou CI RWEB_0076 : `scripts/budget.mjs` échoue si un fichier police (`.woff2/.woff/.ttf/.otf/.eot`) est présent dans `dist/`.

### Corrigé
- `public/print.css` : règles encapsulées dans `@media print`, masquage renforcé (menu plein écran `.site-nav`, images `img`).

## [1.0.0] — 2026-11-25

### Ajouté
- Site React 19 + Vite 7 (SPA, 10 routes), déployé sur Cloudflare Pages (`le-label.org`, aperçu `website-1zw.pages.dev`).
- Design system maison complet : `tokens.scss` (couleurs/thèmes, échelles), partials `styles/components/*.scss`, 11 primitives `src/components/ui/` (Button, Label, Tab, Cover, Logo, Hero, Lead, ListItem, Marquee, Header, Footer).
- Storybook 10 (addon-docs + addon-a11y) déployé sur GitHub Pages : https://lelabelrecords-stack.github.io/website/ — arborescence « Le Label Records » → Welcome / Fondations / Composants / Patterns.
- Contrat DS écrit `/design-system` (dev-only, non embarqué en prod).
- Écoconception : 0 image raster, 1 police Archivo Variable inlinée en data URI, 0 traceur, `print.css`, CSP/HSTS (`_headers`), budget de poids vérifié en CI.
- Accessibilité WCAG AA : landmarks, skip-link, 1 h1 par page, focus-visible, menu plein écran en dialog modal (inert, Échap, retour du focus), onglets en roving tabindex + flèches, contrastes mesurés (5.23:1 / 12.45:1).
- SEO : meta par route, canonical, robots/sitemap, OG/Twitter (og:image PNG 1200×630), JSON-LD MusicGroup + ItemList MusicRelease (sorties) + ItemList Event (événements).
- CI : GitHub Actions (miroir GitLab, déploiement Storybook Pages), GitLab CI (build, audit npm bloquant, budget de poids, tests Storybook test-runner + play, Lighthouse + budgets), Dependabot, templates PR/issues, `security.txt`.
- Mentions légales, page 404, thème rouge `#DB0000` / mono `#343434` (localStorage + anti-FOUC).
