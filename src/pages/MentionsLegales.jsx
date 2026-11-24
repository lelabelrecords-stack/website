import { Link } from 'react-router-dom'
import { config } from '../data.js'
import { usePageMeta } from '../seo.js'

export default function MentionsLegales() {
  usePageMeta(
    'Mentions légales — Le Label Records',
    'Mentions légales du site le-label.org : éditeur, hébergement, données personnelles, propriété intellectuelle.'
  )

  return (
    <>
      <h1>Mentions légales</h1>

      <section aria-labelledby="ml-editeur" className="_row">
        <h2 id="ml-editeur">Éditeur du site</h2>
        <p className="_row">
          <strong>{config.label_name}</strong> — {config.baseline}<br />
          {config.address}<br />
          <a href={`mailto:${config.email}`}>{config.email}</a>
        </p>
        <p className="__row textsize-regular-lh-small">
          Co-dirigé par Christophe et Roxane. Directeur de la publication : la co-direction du label.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ml-hebergement">
        <h2 id="ml-hebergement">Hébergement</h2>
        <p className="_row">
          Site statique hébergé par Cloudflare Pages (Cloudflare, Inc., 101 Townsend Street,
          San Francisco, CA 94107, États-Unis), servi sur https://le-label.org
          (et https://website.pages.dev).
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ml-propriete">
        <h2 id="ml-propriete">Propriété intellectuelle</h2>
        <p className="_row">
          L'ensemble des contenus (textes, logo, visuels, pochettes) est © {config.label_name} et
          leurs auteurs respectifs. Toute reproduction sans autorisation écrite est interdite.
          Les liens externes (Bandcamp, radios, plateformes d'écoute) appartiennent à leurs
          propriétaires.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ml-donnees">
        <h2 id="ml-donnees">Données personnelles &amp; confidentialité</h2>
        <ul className="_row">
          <li className="list-item">Aucun cookie, aucun traceur, aucune mesure d'audience.</li>
          <li className="list-item">
            Le choix de couleur du site (rouge/gris) est stocké uniquement dans le
            <code>localStorage</code> de votre navigateur, jamais transmis.
          </li>
          <li className="list-item">
            Les emails envoyés via les liens « mailto » partent de votre propre client mail ;
            aucune donnée n'est collectée par le site.
          </li>
          <li className="list-item">
            Pour exercer vos droits (accès, rectification, suppression), écrivez à{' '}
            <a href={`mailto:${config.email}`}>{config.email}</a>.
          </li>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="ml-credits">
        <h2 id="ml-credits">Crédits</h2>
        <p className="_row">
          Design inspiré d'<a href="https://utrecht.jp/" target="_blank" rel="noopener noreferrer">utrecht.jp</a>.
          Site écoconçu (aucune image raster, polices auto-hébergées). <Link to="/">Retour à l'accueil</Link>
        </p>
      </section>
    </>
  )
}
