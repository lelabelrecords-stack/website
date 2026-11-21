# Le Label Records — site web

Site vitrine du **Le Label Records** (label indépendant, Nîmes). React + Vite + SCSS, design brutaliste inspiré d'[utrecht.jp](https://utrecht.jp/) (grille stricte, rouge `#db0000`, noir/blanc, typographie Archivo).

## Process de déploiement automatique

```
GitHub  lelabelrecords-stack/website   (code source, branche main)
   ↓ push sur main → GitHub Actions (.github/workflows/deploy.yml) — miroir
GitLab  le-label-records-group/website (miroir + déclencheur)
   ↓ push sur main → pipeline GitLab (.gitlab-ci.yml : build + validate)
   ↓ push sur main → build natif Cloudflare Pages (projet "website" connecté au repo GitLab)
Cloudflare Pages  https://website.pages.dev
```

Dès qu'un commit est poussé sur `main` sur GitHub :

1. GitHub Actions pousse le code sur GitLab (`le-label-records-group/website`) — secret `GITLAB_TOKEN`.
2. La pipeline GitLab build le site (`npm ci && npm run build` → `dist/`, job `build`) puis valide le `dist/` (job `validate`).
3. Le projet Cloudflare Pages `website` (connecté à ce repo GitLab, branche `main`) lance son **build natif** : `npm run build` puis `npx wrangler deploy` — la config `wrangler.jsonc` (assets = `./dist`) fait déployer les fichiers statiques sans détection de framework → déploiement sur https://website.pages.dev.

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
```

Les images du logo officiel (Drive → `Logo/visuels-officiels`) peuvent être déposées dans `public/assets/` et référencées depuis les composants.

## Développement local

```bash
npm ci
npm run dev     # http://localhost:5173
npm run build   # build de production dans dist/
```

## Structure

```
├── data/                        # contenu éditable (JSON)
├── public/                      # favicon, _redirects (SPA Cloudflare Pages)
├── src/
│   ├── components/              # Header, Footer, ReleaseCard, NewsletterForm
│   ├── pages/                   # Accueil, Artistes, Sorties, Événements, À propos, Contact
│   └── styles/main.scss         # port du design utrecht.jp (SCSS)
├── wrangler.jsonc                 # config Worker/assets pour `npx wrangler deploy` (build natif Cloudflare)
├── .github/workflows/deploy.yml # miroir GitHub → GitLab
└── .gitlab-ci.yml               # build + validate (le déploiement est fait par Cloudflare)
```

## Pièges connus

- Projet Pages connecté au repo GitLab dans le dashboard (build natif Cloudflare) : le « Deploy command » `npx wrangler deploy` échoue avec « The version of Vite used in the project (...) cannot be automatically configured. Please update the Vite version to at least 6.0.0 » car wrangler traite le projet en Worker. Deux options : (1) déconnecter l'intégration Git du projet Pages (projet → Settings → Builds → disconnect) et laisser la CI GitLab déployer via `wrangler pages deploy dist` (nécessite alors les variables `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`, non protégées si `main` ne l'est pas) ; (2) **option retenue** — garder le build natif Cloudflare avec `wrangler.jsonc` à la racine (`assets.directory = ./dist`), le job GitLab ne fait plus que build + validate.

- Erreur wrangler dans le job `deploy` : « it's necessary to set a CLOUDFLARE_API_TOKEN environment variable » → la variable n'est pas injectée. Causes possibles : clé mal nommée, variable créée sur un autre projet/groupe, ou variable cochée **Protected** alors que la branche `main` ne l'est pas (GitLab n'injecte les variables protégées que sur les branches protégées). Correctif : décocher « Protected » (garder « Masked »), ou protéger `main` avec « Allowed to push : Maintainers » + « Allow force push » (le miroir GitHub pousse en `--force`).
- Erreur wrangler `GET /memberships ... Authentication failed (status: 400) [code: 9106]` → `CLOUDFLARE_ACCOUNT_ID` absent du job (mêmes causes : Protected sur branche non protégée, mauvaise clé, mauvais projet). Sans Account ID, wrangler tente de résoudre le compte via `/memberships`, interdit à un token limité à Pages. Correctif : définir `CLOUDFLARE_ACCOUNT_ID` (32 caractères hex, non protégé). Test local : `CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler whoami`.
- Erreur wrangler `pages/projects/<nom> ... Project not found [code: 8000007]` → le projet Pages n'existe pas encore sur le compte Cloudflare. Correctif : le créer dans le dashboard (Workers & Pages → Create application → Pages → Create a project, nom exactement `website`), ou laisser la pipeline le faire (elle exécute `wrangler pages project create <nom> --production-branch=main` avant le deploy — wrangler 4 exige le flag `--production-branch`, sinon « Must specify a production branch »). Le nom doit correspondre exactement à `CF_PAGES_PROJECT_NAME`.
- Erreur wrangler `POST /accounts/.../pages/projects ... An unknown error occurred [code: 8000000]` → incident/bug connu côté Cloudflare (HTTP 500 sur la création de projet via l'API ; le token est OK, les GET passent). Correctif : créer le projet **dans le dashboard** (Workers & Pages → Create application → Pages → Create a project, nom `website`, branche de production `main`), puis relancer le job `deploy`. Si le dashboard renvoie aussi 8000000, attendre que l'incident Cloudflare passe (la pipeline réessaie à chaque run grâce au `|| echo`).
- Si le 9106 persiste même avec Account ID renseigné : recréer le token Cloudflare en ajoutant la permission **User → User Details → Read**, puis mettre à jour la variable `CLOUDFLARE_API_TOKEN`.
- Après correction des variables, relancer sans nouveau commit : bouton **Retry** sur le job `deploy` de la pipeline en échec, ou `git commit --allow-empty && git push`.
- Erreur « protected branch » au miroir GitHub → GitLab : `main` est protégée sans force-push autorisé → la déprotéger, ou appliquer le réglage ci-dessus.

