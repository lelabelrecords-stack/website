import { usePageMeta } from '../seo.js'
import { config } from '../data.js'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'

export default function APropos() {
  usePageMeta('À propos — Le Label Records', 'Le Label Records, label indépendant à Nîmes : accompagnement des artistes, de près et avec des humains.')
  return (
    <>
      <Hero title="À propos" />

      <section aria-labelledby="apropos-label" className="_row">
        <h3 id="apropos-label" className="visually-hidden">Le label</h3>
        <Lead>{config.baseline}</Lead>
        <p className="_row">{config.description}</p>
      </section>

      <section aria-labelledby="apropos-accompagnement" className="_row">
        <h3 id="apropos-accompagnement">Accompagnement</h3>
        <p className="_row">
          On accompagne chaque groupe de près et sur la durée, avec des humains : un interlocuteur
          direct, des temps de travail commun pour préparer les sorties et la scène, des concerts
          qu'on organise avec les artistes, et une visibilité à la radio et dans la presse.
          On avance avec eux, pas à leur place — on partage les décisions, les contacts et les moyens.
        </p>
      </section>

      <section aria-labelledby="apropos-adresse" className="_row">
        <h3 id="apropos-adresse">Adresse</h3>
        <p className="_row">{config.address}</p>
        <p className="__row textsize-small">
          <a href={`mailto:${config.email}`}>{config.email}</a>
        </p>
      </section>
    </>
  )
}
