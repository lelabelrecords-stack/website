# Le Label Records — site web

Site vitrine du **Le Label Records** (label indépendant, Nîmes). React + Vite + SCSS, design brutaliste maison (grille stricte `.col-*`, rouge `#db0000`, noir/blanc, typographie Archivo auto-hébergée, logo contour-rouge). Le site est pensé **écoconception** (aucune image raster, aucun traceur, 1 police woff2 inlinée en data URI, ~100 Ko au total) et **accessible** (landmarks sémantiques, lien « Aller au contenu », `aria-current` sur la nav, focus visible, `prefers-reduced-motion` respecté, contrastes AA).

## Process de déploiement automatique

```
GitHub  lelabelrecords-stack/website   (code source, branche main)
   ↓ push sur main → GitHub Actions (.github/workflows/deploy.yml) — miroir
GitLab  le-label-records-group/website (miroir + déclencheur)
   ↓ push sur main → pipeline GitLab (.gitlab-ci.yml : build + validate)
   ↓ push sur main → build natif Cloudflare Pages (projet "website" connecté au repo GitLab)
Cloudflare Pages  https://le-label.org  (domaine perso ; URL par défaut du projet : https://website-1zw.pages.dev)
```

Dès qu'un commit est poussé sur `main` sur GitHub :

1. GitHub Actions pousse le code sur GitLab (`le-label-records-group/website`) — secret `GITLAB_TOKEN`.
2. La pipeline GitLab build le site (`npm ci && npm run build` → `dist/`, job `build`) puis valide le `dist/` (job `validate`).
3. Le projet Cloudflare Pages `website` (connecté à ce repo GitLab, branche `main`) lance son **build natif** : `npm run build`, puis Pages déploie automatiquement le **build output directory** (`dist`) → déploiement sur https://le-label.org (domaine perso configuré sur le projet Pages ; https://website-1zw.pages.dev reste l'URL par défaut). **Ne pas mettre de « Deploy command » wrangler** dans les réglages de build (voir pièges) ; `wrangler.jsonc` contient `pages_build_output_dir: "dist"` pour les déploiements wrangler manuels.

Vérification : [Actions GitHub](https://github.com/lelabelrecords-stack/website/actions) · [Pipelines GitLab](https://gitlab.com/le-label-records-group/website/-/pipelines).

## Secrets à configurer (une seule fois)

**Sur GitHub** — [settings/secrets/actions](https://github.com/lelabelrecords-stack/website/settings/secrets/actions) :

- `GITLAB_TOKEN` : personal access token GitLab (scopes `api` + `write_repository`), créé sur [gitlab.com/-/profile/personal_access_tokens](https://gitlab.com/-/profile/personal_access_tokens).

**Sur GitLab** — [Settings → CI/CD → Variables](https://gitlab.com/le-label-records-group/website/-/settings/ci_cd) : plus besoin de variables Cloudflare depuis le passage au build natif (elles utilisent le « build token » Cloudflare du projet). `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` et `CF_PAGES_PROJECT_NAME` peuvent être supprimées. (La CI les utilisait auparavant pour un déploiement via `wrangler pages deploy` — chemin conservé en secours, voir « Pièges connus ».)

**Sur GitLab** — [Settings → Repository](https://gitlab.com/le-label-records-group/website/-/settings/repository) : retirer la protection de la branche `main` (ou autoriser le force push) sinon le miroir échoue.

## Modifier le contenu

Tout le contenu est dans `data/` — éditer les JSON, commit, push sur `main`, le site se met à jour automatiquement :

```
data/
├── config.json       # nom, description, email, adresse, réseaux, radio Le Label²
├── artistes.json    # roster (bio, liens, presse)
├── sorties.json      # sorties (single/EP/LP, dates, liens d'écoute)
├── evenements.json   # concerts, release parties, festivals
└── news.json         # actus de l'accueil
└── drafts.json                # brouillons non signés (non embarqués dans le build)
```

Les images du logo officiel (Drive → `Logo/visuels-officiels`) peuvent être déposées dans `public/assets/` et référencées depuis les composants.

## Développement local

```bash
npm ci
npm run dev     # http://localhost:5173
npm run build   # build de production dans dist/
```

## Design system — Storybook (vitrine des composants)

```bash
npm run storybook        # dev : http://localhost:6006 (addon a11y actif)
npm run build-storybook  # build statique dans storybook-static/ (noindex)
```

Stories : `src/stories/Introduction.mdx`, `src/stories/Fondations.stories.jsx`, `src/stories/Patterns.stories.jsx` + `src/components/ui/*.stories.jsx` (une story par primitive, autodocs + contrôles + panneau a11y). Arborescence (style Ring UI) : racine « Le Label Records » → Welcome (Bienvenue, Principes, Démarrer) / Fondations / Composants/* / Patterns.
Déploiement : workflow `.github/workflows/storybook-pages.yml` → GitHub Pages, hors du domaine principal :
https://lelabelrecords-stack.github.io/website/
Le contrat écrit du DS (`src/pages/DesignSystem.jsx`) est **dev-only** : `npm run dev` → http://localhost:5173/design-system.
Il n'est pas embarqué dans le build de production (ni dans robots.txt/sitemap).

**Charte graphique (logo)** : documentée dans le DS — section « Marque (logo) » de `/design-system` (dev) et story `Composants/Logo` (Storybook). Les SVG sources sont téléchargeables (attribut `download`) : `public/assets/logo-contour-rouge.svg` (contour, `stroke: currentColor`) + `logo-contour-rouge-blanc.svg` (blanc `#fff` sur fond accent). Variantes : rouge `#DB0000` / mono `#343434` (thème) / blanc sur accent (`.logo-svg--on-accent`). Règles : ratio `571.799 × 763.875` jamais déformé, fond uni, aucune recoloration hors `var(--accent)`/`#fff`, aucun PNG/JPG (contrat 0 raster).

## CI, qualité & sécurité

- **GitHub Actions** : `deploy.yml` (miroir GitLab) + `storybook-pages.yml` (DS Storybook → GitHub Pages, noindex).
- **GitLab CI** (`.gitlab-ci.yml`, branche `main`) : `build` → `audit` (npm audit bloquant, 0 vulnérabilité grâce aux overrides glob/minimatch) → `budget` (`scripts/budget.mjs` : JS ≤ 100 Ko gzip, CSS ≤ 45 Ko, dist ≤ 512 Ko) → `validate` (fichiers attendus dans dist/) → `ds-tests` (Storybook addon-vitest : navigateur playwright headless, inclut le play test de Tab) → `lighthouse` (binaire Chromium téléchargé par Playwright, lancé en direct avec `--remote-debugging-port=0` + Lighthouse connecté via `flags.port` — `scripts/lighthouse-run.mjs` ; budgets `lighthouse-budget.json` : 0 font externe, 0 third-party, poids total ≤ 600 Ko).
- **Écoconception auditée (EcoIndex / RWEB)** : RWEB_0031 via `public/print.css` (`<link media="print">` dans `index.html` : chrome et images masqués, noir sur blanc) ; RWEB_0076 via brotli edge Cloudflare sur tout le texte + police inlinée en data URI (0 requête font) avec garde-fou CI « 0 fichier font dans `dist/` » (`scripts/budget.mjs`). Contrat documenté dans le DS (Storybook → Fondations → Écoconception, ou `/design-system` en dev). Note : EcoIndex met en cache son rapport par URL — re-scanner avec un paramètre anti-cache (`?eco=2`).
- **Sécurité** : `public/.well-known/security.txt` (RFC 9116), CSP/HSTS/nosniff dans `_headers`, `npm audit` en CI, Dependabot (`.github/dependabot.yml`, hebdo).
- **Protection de `main`** (à activer côté dashboard GitHub : Settings → Branches → Add rule sur `main` : « Do not allow force pushes » + « Require a pull request before merging » si vous passez en PR ; sinon gardez le push direct mais cochez au minimum l'interdiction du force-push). Templates : `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`.
- **Rollback** : Cloudflare Pages garde l'historique (projet → Deployments → Revert) ; releases taguées (`v1.0.0`, voir CHANGELOG.md).

## Options non retenues (à rediscuter)

- **Cloudflare Web Analytics** (sans cookie, gratuit, RGPD-ok) si besoin de stats.
- **PWA** (manifest + mini service worker) pour l'offline — à peser côté écolo.
- **Kit presse** téléchargeable (zip de logos SVG).

## Structure

```
├── data/                        # contenu éditable (JSON)
├── public/
│   ├─ assets/                  # logo contour-rouge.svg (+ variante blanche) : seul visuel du site
│   ├─ favicon.svg
│   └─ _redirects               # SPA Cloudflare Pages
├── src/
│   ├─ components/              # Header (nav responsive), Footer, ReleaseCard
│   ├─ pages/                   # Accueil, Artistes, Sorties, Événements, News, Radio (Le Label²), À propos, Contact, 404
│   ├─ data.js                  # chargement des JSON + formatage des dates (fr-FR)
│   └─ styles/main.scss         # design system (tokens, grille, spacers, a11y)
├── wrangler.jsonc                 # config Worker/assets pour `npx wrangler deploy` (build natif Cloudflare)
├── .github/workflows/deploy.yml # miroir GitHub → GitLab
└── .gitlab-ci.yml               # build + validate (le déploiement est fait par Cloudflare)
```

Pages : `/`, `/artistes`, `/sorties`, `/evenements`, `/news`, `/radio`, `/a-propos`, `/contact`.

## Pièges connus

- **Incident 2026-11-24 (résolu, déploiement vert à 11:52 UTC)** — le build natif Pages échouait en phase « Deploying » : le projet a un « Deploy command » `npx wrangler pages deploy dist --project-name=website --branch=main`, et wrangler renvoie `Authentication error [code: 10000]` sur `/accounts/.../pages/projects/website` même avec un `CLOUDFLARE_API_TOKEN` Super Admin défini en variable d'environnement du projet. **Correctif (dashboard Cloudflare, projet `website` → Settings → Builds)** : vider le « Deploy command », mettre « Build output directory » = `dist`, et supprimer les variables d'environnement `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CF_PAGES_PROJECT_NAME` du projet (Settings → Environment variables). Pages déploie alors nativement. Relancer ensuite le déploiement (bouton Retry sur le déploiement en échec, ou `git commit --allow-empty && git push`). Résolu le 2026-11-24 : deploy command vidé, output `dist`, root `/` → déploiement vert, le site est servi sur `https://website-1zw.pages.dev`. **Vérifier aussi** que le domaine perso `le-label.org` est bien rattaché à CE projet `website` (Settings → Custom domains) : s'il est sur un autre projet sans déploiement, c'est la page par défaut « Hello world » qui s'affiche sur le domaine.
- Projet Pages connecté au repo GitLab dans le dashboard (build natif Cloudflare) : le « Deploy command » `npx wrangler deploy` échoue avec « The version of Vite used in the project (...) cannot be automatically configured. Please update the Vite version to at least 6.0.0 » car wrangler traite le projet en Worker. Deux options : (1) déconnecter l'intégration Git du projet Pages (projet → Settings → Builds → disconnect) et laisser la CI GitLab déployer via `wrangler pages deploy dist` (nécessite alors les variables `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`, non protégées si `main` ne l'est pas) ; - Build natif Pages qui échoue en phase « Deploying » avec `Authentication error [code: 10000]` quand la deploy command est un wrangler : dans l'environnement de build Pages, ne **pas** définir soi-même `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` (variables d'environnement de build du projet → à supprimer si présentes) et **laisser le « Deploy command » vide** avec « Build output directory » = `dist` : Pages déploie alors nativement, sans wrangler. `wrangler.jsonc` doit contenir `"pages_build_output_dir": "dist"` (champ exigé par Pages, sinon warning). `npx wrangler deploy` (Worker) est à éviter ici : droit Workers Scripts: Edit requis + auto-config Vite ≥ 6.
- (2) **option retenue** — build natif Cloudflare, deploy command vide, output dir `dist` ; le job GitLab ne fait plus que build + validate.

- Erreur wrangler dans le job `deploy` : « it's necessary to set a CLOUDFLARE_API_TOKEN environment variable » → la variable n'est pas injectée. Causes possibles : clé mal nommée, variable créée sur un autre projet/groupe, ou variable cochée **Protected** alors que la branche `main` ne l'est pas (GitLab n'injecte les variables protégées que sur les branches protégées). Correctif : décocher « Protected » (garder « Masked »), ou protéger `main` avec « Allowed to push : Maintainers » + « Allow force push » (le miroir GitHub pousse en `--force`).
- Erreur wrangler `GET /memberships ... Authentication failed (status: 400) [code: 9106]` → `CLOUDFLARE_ACCOUNT_ID` absent du job (mêmes causes : Protected sur branche non protégée, mauvaise clé, mauvais projet). Sans Account ID, wrangler tente de résoudre le compte via `/memberships`, interdit à un token limité à Pages. Correctif : définir `CLOUDFLARE_ACCOUNT_ID` (32 caractères hex, non protégé). Test local : `CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler whoami`.
- Erreur wrangler `pages/projects/<nom> ... Project not found [code: 8000007]` → le projet Pages n'existe pas encore sur le compte Cloudflare. Correctif : le créer dans le dashboard (Workers & Pages → Create application → Pages → Create a project, nom exactement `website`), ou laisser la pipeline le faire (elle exécute `wrangler pages project create <nom> --production-branch=main` avant le deploy — wrangler 4 exige le flag `--production-branch`, sinon « Must specify a production branch »). Le nom doit correspondre exactement à `CF_PAGES_PROJECT_NAME`.
- Erreur wrangler `POST /accounts/.../pages/projects ... An unknown error occurred [code: 8000000]` → incident/bug connu côté Cloudflare (HTTP 500 sur la création de projet via l'API ; le token est OK, les GET passent). Correctif : créer le projet **dans le dashboard** (Workers & Pages → Create application → Pages → Create a project, nom `website`, branche de production `main`), puis relancer le job `deploy`. Si le dashboard renvoie aussi 8000000, attendre que l'incident Cloudflare passe (la pipeline réessaie à chaque run grâce au `|| echo`).
- Si le 9106 persiste même avec Account ID renseigné : recréer le token Cloudflare en ajoutant la permission **User → User Details → Read**, puis mettre à jour la variable `CLOUDFLARE_API_TOKEN`.
- Après correction des variables, relancer sans nouveau commit : bouton **Retry** sur le job `deploy` de la pipeline en échec, ou `git commit --allow-empty && git push`.
- Erreur « protected branch » au miroir GitHub → GitLab : `main` est protégée sans force-push autorisé → la déprotéger, ou appliquer le réglage ci-dessus.

