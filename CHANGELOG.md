# Changelog

Format [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versionnage sémantique.

## [Unreleased]

### Ajouté
- Carte de visite digitale dans le DS : composant `ui/BusinessCard` (+ partial `bcard.scss`, story Storybook « Composants/BusinessCard », section dans `/design-system`) — une carte par personne (photo `/vcard/<slug>.jpg`, tél, verbatim, émission Le Label² sur Rayvox / Raje Radio / Radio Alliance+), CTA « Ajouter à mes contacts » → `/vcard/<slug>.vcf` (téléchargement, `PHOTO` embarquée en base64 brut RFC 6350).
- Cartes statiques servies sur `/vcard/` (`public/vcard/`, copiées depuis le dépôt `vcard`) avec `Content-Type: text/vcard; charset=utf-8` via `_headers` (encodage correct au téléchargement).
- Contrat écoconception documenté dans le DS (page `/design-system` en dev + Storybook → Fondations → « Écoconception ») : RWEB_0031 (`print.css` : chrome et images masqués à l'impression, noir sur blanc) et RWEB_0076 (brotli edge Cloudflare sur tout le texte, police inlinée en data URI → 0 requête font).
- Garde-fou CI RWEB_0076 : `scripts/budget.mjs` échoue si un fichier police (`.woff2/.woff/.ttf/.otf/.eot`) est présent dans `dist/`.

### Corrigé
- `public/print.css` : règles encapsulées dans `@media print`, masquage renforcé (menu plein écran `.site-nav`, images `img`).

### Changé (revue UX complète, documentée dans le DS + Storybook)
- Événements : sections « Prochains » / « Passés » (`upcomingEvents`/`pastEvents` dans `data.js`), plus d'événement passé dans le fil d'actus de l'accueil ; libellés de lien explicites (`eventLinkLabel` : « Billetterie » pour un concert, « Infos » sinon) ; JSON-LD limité aux prochains.
- Radio : bouton « Écouter sur <diffuseur> » par antenne ; chaque épisode a un `link` (config.json) → bouton « Écouter l'épisode ».
- Actus sans lien : plus de bouton « Nous contacter » (Home + News).
- Accueil : CTA dans le hero via la nouvelle prop `actions` de `<Hero>` (« Voir les sorties », « Écouter le dernier épisode »), 3 dernières sorties seulement, bloc radio en 3 colonnes. Le logo latéral reste finalement visible sur l'accueil (règle `.is-home` retirée après retour utilisateur).
- `ReleaseCard` : pastille `Cover` = nom de l'artiste (type « EP · date » en métadonnée), liens d'écoute en `<Button>` (cohérence DS).
- Liens externes : marqueur ↗ automatique (`a[target='_blank']::after` dans base.scss). Sur `<Button>`, la flèche est placée dans le coin interne supérieur droit (`button.scss`).
- Bouton thème : « Passer en mono / rouge » (pastille de la couleur cible) au lieu de « Appliquer le #… ».
- Contact : adresses de nouveau sur **`lelabel@le-label.org`** — Email Routing Cloudflare actif (test d'envoi OK le 2026-11-26) : MX apex `route1/2/3.mx.cloudflare.net` (MX Google supprimé), SPF `v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all`, DKIM `cf2024-1._domainkey.le-label.org`, règle `lelabel@le-label.org` → `le.label.contact@gmail.com`, DMARC `p=none` (à durcir en `p=quarantine` dans 2–4 semaines). Mis à jour : `email`/`demo_submission_email` (`data/config.json`), `Contact:` (`security.txt`), champ `email` du JSON-LD (`index.html`). `www.le-label.org` ajouté comme custom domain du projet Pages (vérifié : 200 + CSP/HSTS).
- Footer compact et équilibré : padding réduit (2.08333rem, 1.5rem mobile), colonne infos en 3 lignes (`.footer-info`), nav en lignes resserrées — documenté dans le DS.
- CI `ds-tests` (vitest navigateur) : `optimizeDeps.include` de `react/jsx-dev-runtime` / `react/jsx-runtime` dans `vitest.config.mjs` pour éviter le rechargement Vite en cours de run (« Failed to fetch dynamically imported module »).
- CI `lighthouse` : binaire Chromium (téléchargé par Playwright) lancé en direct avec `--remote-debugging-port=0`, port CDP lu sur stderr, puis Lighthouse connecté via `flags.port` (`scripts/lighthouse-run.mjs`, `npm run test:lh`) — chrome-launcher / `launchServer` ne donnaient pas de vrai port CDP sur le runner k8s.
- CI jobs navigateur : `npx playwright install-deps chromium` (liste officielle des libs système) + garde-fou `ldd` sur le binaire — `libXfixes.so.3` manquait sur un runner k8s avec la liste apt manuelle.

- Nom d'artiste corrigé : **KØRROBOR** (Ø) partout où il est affiché (data, pages, stories) — ids (`k0rrobor`, `k0rrobor-ep1`) et URL Bandcamp inchangés.
- `h2` retravaillé : titre de section en display — graisse 900 `$font-black`, capitales, nouveau token `$fs-h2` clamp(1.5–2.5rem), lh 1.1. Mise en évidence 100 % typographique, sans filet.
- Tous les `<hr>` supprimés (pages, DS, stories ; règle retirée de `layout.scss`) : la séparation des blocs se fait uniquement par l'espacement vertical — classes `$spaces` posées sur le bloc suivant (ex. `section._row`). Règle documentée dans le DS (Grille & espacements, Patterns « Page type ») + story Fondations/Espacement.
- Intitulé des cartes produit plus gros : nouvelle classe `.release-title` (token `$fs-card-title` 1.25rem, graisse 900, capitales) dans `cover.scss`, utilisée par `ReleaseCard` — documentée dans le DS (Typographie, Composants/Cover, Patterns « Carte produit ») et les stories (Cover, Patterns).
- Le DS public (Storybook, noindex) est référencé depuis le site, **au même niveau que les autres liens externes du footer** (ligne `.footer-info` : réseaux + « Design system ↗ », URL `design_system_url` dans `data/config.json`) ; `.footer-bottom` ne contient plus que © + mention éco. Les liens sociaux ouvrent en nouvel onglet (↗ automatique).
- Listes (`ListItem`) : filets supprimés (`border-top` / `border-bottom` retirés de `list.scss`) — les éléments se séparent par le padding seul, conformément à la règle « sans limite visuelle » (aucun filet de liste, comme aucun `<hr>`). DS (ListItem, $bw) + story + CHANGELOG à jour. Note : à l’impression, `print.css` garde un filet noir 1px sur `.list-item` pour la lisibilité papier.
- Pastille `Cover` (`.image-label`) beaucoup plus grosse : nouveau token `$fs-image-label` clamp(1rem, 2.2vw, 1.75rem) + graisse 900 `$font-black` + capitales ; ellipsis si dépassement (max-width 92 %) à toutes tailles, l’ancien override mobile 0.667rem est supprimé. DS (Visuels, Typographie, tokens) + story Cover à jour.
- `ListItem` : croisillon « + » (900) en tête de chaque élément (`.list-item > :first-child::before`) pour distinguer les items en colonnes/lignes, toujours sans filet. DS + story ListItem à jour.
- **Charte graphique dans le DS** : nouvelle section « Marque (logo) » (`/design-system` dev + TOC) avec les **SVG sources téléchargeables** (`logo-contour-rouge.svg` à `stroke: currentColor`, `logo-contour-rouge-blanc.svg`), les variantes (rouge/mono/blanc sur fond accent via `.logo-svg--on-accent`), le ratio `571.799 × 763.875` et les règles (pas de déformation, pas de recoloration hors `var(--accent)`/`#fff`, aucun PNG/JPG — contrat 0 raster ; kit presse PNG = option non retenue). Story `Logo/SurFondAccent` + `Logo/Telechargement` (liens `download` via import `?url`), README à jour.

- `Label` : ajout de `vertical-align: middle` — l'étiquette est désormais toujours alignée verticalement avec un `<Button>` inline sur la même ligne (ligne `.list-date` : plus de décalage #Actu / « En savoir plus »). DS à jour.
- Croisillon des `ListItem` rendu plus visible : `font-size: 1.25em` + `line-height: 1` sur `.list-item > :first-child::before`. DS à jour.
- Toggle de thème : la couleur cible passe par la variable CSS `--toggle-target` (posée en inline par `Header.jsx`) ; au survol/focus, le bouton prend **fond = couleur cible, texte = `var(--on-accent)`** (ex. survol « Passer en mono » → fond #343434 texte blanc ; « Passer en rouge » → fond #DB0000 texte blanc), la pastille garde un filet `on-accent`. Contrastes mesurés OK (5.23:1 / 12.45:1). DS (Header) + CHANGELOG à jour.

- Ligne `.list-date` (date/catégorie des actus et événements) passée en **italique** ; le `Label` et le `<Button>` inline restent droits (`.list-date .label, .list-date .button { font-style: normal }`). DS (Patterns) à jour.
- Croisillon `ListItem` encore plus visible : `font-size: 1.5em` (était 1.25em). DS à jour.

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
