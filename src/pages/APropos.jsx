import { config } from '../data.js'

export default function APropos() {
  return (
    <>
      <h1>À propos</h1>

      <section aria-labelledby="apropos-label" className="_row">
        <h3 id="apropos-label" className="visually-hidden">Le label</h3>
        <p className="lead">{config.baseline}</p>
        <p className="_row">{config.description}</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="apropos-accompagnement">
        <h3 id="apropos-accompagnement">Accompagnement</h3>
        <ul className="_row">
          <li className="list-item"><strong>Résidences scéniques</strong> — avant chaque sortie, une résidence (ex. Paloma, Nîmes) pour construire le live avec le groupe.</li>
          <li className="list-item"><strong>Release parties &amp; tournées</strong> — on produit la release party puis le tour qui suit (Occitanie et au-delà), et on branche les groupes sur les festivals (Off du TINALS, Belles Journées…).</li>
          <li className="list-item"><strong>Co-productions</strong> — on partage les sorties avec d'autres labels (Hidden Bay, Araki, Numavi…) : coûts, réseaux, co-plateaux.</li>
          <li className="list-item"><strong>Visibilité</strong> — clips, presse spécialisée et radio : Le Label², une heure par mois sur Rayvox, Raje et Radio Alliance +.</li>
          <li className="list-item"><strong>Distribution</strong> — digitale via WiseBand, catalogue en direct sur Bandcamp.</li>
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="apropos-modele">
        <h3 id="apropos-modele">Modèle économique</h3>
        <p className="_row">
          100 % des royalties nettes de distribution vont aux groupes — le label ne prélève rien
          sur les ventes. Il ne retient que 20 % sur les subventions publiques, les 80 % restants
          servant à financer la production et la promotion des artistes.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="apropos-adresse">
        <h3 id="apropos-adresse">Adresse</h3>
        <p className="_row">{config.address}</p>
        <p className="__row textsize-small">
          <a href={`mailto:${config.email}`}>{config.email}</a>
        </p>
      </section>
    </>
  )
}
