import { Link } from 'react-router-dom'
import { config } from '../data.js'
import { usePageMeta } from '../seo.js'
import Hero from '../components/ui/Hero.jsx'
import ListItem from '../components/ui/ListItem.jsx'

export default function MentionsLegales() {
  usePageMeta(
    'Mentions légales — Le Label Records',
    'Mentions légales du site le-label.org : éditeur, hébergement, données personnelles, propriété intellectuelle.'
  )

  return (
    <>
      <Hero title="Mentions légales" />

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

      <section aria-labelledby="ml-hebergement" className="_row">
        <h2 id="ml-hebergement">Hébergement</h2>
        <p className="_row">
          Site statique hébergé par Cloudflare Pages (Cloudflare, Inc., 101 Townsend Street,
          San Francisco, CA 94107, États-Unis), servi sur https://le-label.org
          (et https://website.pages.dev).
        </p>
      </section>

      <section aria-labelledby="ml-propriete" className="_row">
        <h2 id="ml-propriete">Propriété intellectuelle</h2>
        <p className="_row">
          L'ensemble des contenus (textes, logo, visuels, pochettes) est © {config.label_name} et
          leurs auteurs respectifs. Toute reproduction sans autorisation écrite est interdite.
          Les liens externes (Bandcamp, radios, plateformes d'écoute) appartiennent à leurs
          propriétaires.
        </p>
      </section>

      <section aria-labelledby="ml-donnees" className="_row">
        <h2 id="ml-donnees">Données personnelles &amp; confidentialité</h2>
        <ul className="_row">
          <ListItem>Aucun cookie, aucun traceur, aucune mesure d'audience.</ListItem>
          <ListItem>
            Le choix de couleur du site (rouge/gris) est stocké uniquement dans le
            <code>localStorage</code> de votre navigateur, jamais transmis.
          </ListItem>
          <ListItem>
            Les emails envoyés via les liens « mailto » partent de votre propre client mail ;
            aucune donnée n'est collectée par le site.
          </ListItem>
          <ListItem>
            Pour exercer vos droits (accès, rectification, suppression), écrivez à{' '}
            <a href={`mailto:${config.email}`}>{config.email}</a>.
          </ListItem>
        </ul>
      </section>

      <section aria-labelledby="ml-credits" className="_row">
        <h2 id="ml-credits">Crédits</h2>
        <p className="_row">
          Site écoconçu : aucune image raster, polices auto-hébergées, aucun traceur. <Link to="/">Retour à l'accueil</Link>
        </p>
      </section>
    </>
  )
}
