import Marquee from '../components/ui/Marquee.jsx'

export default { title: 'Le Label Records/Fondations' }

export const Couleur = () => (
  <div className="flex-container">
    <div className="col-25 col-50-sp"><div className="ds-swatch ds-swatch--accent" /><p className="____row textsize-small">--accent #DB0000 · contraste/bg 5.23:1 (AA)</p></div>
    <div className="col-25 col-50-sp"><div className="ds-swatch ds-swatch--mono" /><p className="____row textsize-small">thème mono #343434 · 12.45:1 (AAA)</p></div>
    <div className="col-25 col-50-sp"><div className="ds-swatch ds-swatch--bg" /><p className="____row textsize-small">--bg #FFFFFF</p></div>
    <div className="col-25 col-50-sp"><div className="ds-swatch" style={{ background: 'var(--accent)', color: 'var(--on-accent)', lineHeight: '4rem', textAlign: 'center' }}>Aa</div><p className="____row textsize-small">--on-accent #FFFFFF sur fond plein</p></div>
  </div>
)

export const Typographie = () => (
  <>
    <p className="hero-title">Hero title</p>
    <p className="lead _row">Lead — graisse 900, clamp(1.5rem, 3.2vw, 2.5rem)</p>
    <h2 className="_row">h2 — section</h2>
    <p className="__row">Paragraphe standard — Archivo 400, 1rem / 1.667.</p>
    <p className="__row textsize-small">textsize-small — 0.833rem / 1.25 (0.667rem ≤ 767px).</p>
  </>
)

export const Grille = () => (
  <div className="flex-container">
    {[25, 25, 25, 25].map((c) => (
      <div key={c} className={`col-${c} col-50-sp`}><div className="ds-box">col-{c}</div></div>
    ))}
  </div>
)

export const Espacement = () => (
  <div>
    <div className="row ds-box">.row — 50px</div>
    <div className="_row ds-box">._row — 25px</div>
    <div className="__row ds-box">.__row — 12.5px</div>
    <div className="___row ds-box">.___row — 8.3px</div>
    <div className="____row ds-box">.____row — 6.25px</div>
    <div className="_____row ds-box">._____row — 5px</div>
    <p className="___row textsize-small">&lt;hr&gt; = espaceur invisible (aucun filet)</p>
  </div>
)

export const Motion = () => (
  <>
    <p className="__row textsize-small">$dur 0.2s · marquee 28s (pause au survol, arrêt si prefers-reduced-motion) · scroll smooth sauf reduced-motion.</p>
    <Marquee text="K0RROBOR · Montevideo · Le Label² · Nîmes" />
  </>
)

export const Ecoconception = () => (
  <div style={{ maxWidth: '46rem' }}>
    <p className="__row">Contrat éco du site, audité avec EcoIndex (référentiel RWEB) :</p>
    <ul className="_row">
      <li>0 image raster, 0 traceur, 0 cookie — tout est auto-hébergé (CSS, JS, SVG, police).</li>
      <li><strong>RWEB_0076</strong> (compression) : brotli/gzip automatique à l'edge Cloudflare Pages sur tout le texte ; la seule police (Archivo Variable woff2) est inlinée en <code>data:</code> URI dans le CSS → aucune requête font. Garde-fou CI : <code>scripts/budget.mjs</code> échoue si un fichier <code>.woff2/.woff/.ttf</code> existe dans <code>dist/</code>.</li>
      <li><strong>RWEB_0031</strong> (impression) : <code>public/print.css</code> lié via <code>&lt;link media="print"&gt;</code> — masque header, footer, barre latérale, menu plein écran, boutons et images ; contenu noir sur blanc.</li>
      <li>Budgets de poids en CI : JS ≤ 100 Ko gzip, CSS ≤ 45 Ko, HTML ≤ 4 Ko, dist ≤ 512 Ko + Lighthouse (<code>lighthouse-budget.json</code> : 0 font externe, 0 third-party, ≤ 600 Ko au total).</li>
      <li>Re-scanner EcoIndex avec un paramètre anti-cache (ex. <code>?eco=2</code>) : l'outil met en cache le rapport par URL.</li>
    </ul>
  </div>
)
