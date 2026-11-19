# Le Label Records — site web

Site vitrine du **Le Label Records** (label indépendant, Nîmes). React + Vite + SCSS, design brutaliste inspiré d'[utrecht.jp](https://utrecht.jp/) (grille stricte, rouge `#db0000`, noir/blanc, typographie Archivo).

## Process de déploiement automatique

```
GitHub  lelabelrecords-stack/website   (code source, branche main)
   ↓ push sur main → GitHub Actions (.github/workflows/deploy.yml)
GitLab  le-label-records-group/website (miroir)
   ↓ pipeline (.gitlab-ci.yml)
Cloudflare Pages (hébergement, déploiement via wrangler)
```

Dès qu'un commit est poussé sur `main` sur GitHub :

1. GitHub Actions pousse le code sur GitLab (`le-label-records-group/website`).
2. La CI GitLab build le site (`npm ci && npm run build` → `dist/`) avec `node:20-alpine`.
3. La CI déploie `dist/` sur Cloudflare Pages avec `wrangler pages deploy`.

Vérification : [Actions GitHub](https://github.com/lelabelrecords-stack/website/actions) · [Pipelines GitLab](https://gitlab.com/le-label-records-group/website/-/pipelines).

## Secrets à configurer (une seule fois)

**Sur GitHub** — [settings/secrets/actions](https://github.com/lelabelrecords-stack/website/settings/secrets/actions) :

- `GITLAB_TOKEN` : personal access token GitLab (scopes `api` + `write_repository`), créé sur [gitlab.com/-/profile/personal_access_tokens](https://gitlab.com/-/profile/personal_access_tokens).

**Sur GitLab** — [Settings → CI/CD → Variables](https://gitlab.com/le-label-records-group/website/-/settings/ci_cd) (masked, protected) :

- `CLOUDFLARE_API_TOKEN` : token Cloudflare (droit Pages:Edit), créé sur [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
- `CLOUDFLARE_ACCOUNT_ID` : Account ID Cloudflare (profil → API).
- `CF_PAGES_PROJECT_NAME` : nom du projet Cloudflare Pages (défaut `website`) — à adapter si le projet Pages porte un autre nom.

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
├── .github/workflows/deploy.yml # miroir GitHub → GitLab
└── .gitlab-ci.yml               # build + déploiement Cloudflare Pages
```
