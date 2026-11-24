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

      <section aria-labelledby="apropos-doctrine">
        <h3 id="apropos-doctrine">Doctrine</h3>
        <ul className="_row">
          <li className="list-item">100 % des royalties nettes de distribution vont aux groupes — le label ne prélève rien sur les ventes.</li>
          <li className="list-item">Sur les subventions publiques, le label retient 20 % ; les 80 % restants financent la production et la promotion des artistes.</li>
          <li className="list-item">Distribution digitale via WiseBand, catalogue en direct sur Bandcamp.</li>
        </ul>
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
