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
        <p className="_row">
          On accompagne chaque groupe de près et sur la durée, avec des humains : un interlocuteur
          direct, des temps de travail commun pour préparer les sorties et la scène, des concerts
          qu'on organise avec les artistes, et une visibilité à la radio et dans la presse.
          On avance avec eux, pas à leur place — on partage les décisions, les contacts et les moyens.
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
