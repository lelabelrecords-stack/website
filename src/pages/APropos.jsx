import { config } from '../data.js'

export default function APropos() {
  return (
    <>
      <h2>À propos</h2>

      <section aria-labelledby="apropos-label" className="_row">
        <h3 id="apropos-label" className="visually-hidden">Le label</h3>
        <p className="lead">{config.baseline}</p>
        <p className="_row">{config.description}</p>
      </section>

      <hr className="row" />

      <section aria-labelledby="apropos-doctrine">
        <h3 id="apropos-doctrine">Doctrine</h3>
        <ul className="_row">
          <li className="list-item">100 % des royalties nettes de distribution vont aux groupes.</li>
          <li className="list-item">Le label ne retient que 20 % sur les subventions.</li>
          <li className="list-item">Distribution via WiseBand, catalogue en direct sur Bandcamp.</li>
        </ul>
      </section>

      <hr className="row" />

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
