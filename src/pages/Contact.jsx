import { usePageMeta } from '../seo.js'
import { config } from '../data.js'
import Hero from '../components/ui/Hero.jsx'
import Button from '../components/ui/Button.jsx'

export default function Contact() {
  usePageMeta('Contact — Le Label Records', `Contacter le Le Label Records (Nîmes) : presse et démos à ${config.demo_submission_email}, 8 rue Nationale 30000 Nîmes.`)
  return (
    <>
      <Hero title="Contact" />

      <section aria-labelledby="contact-general" className="_row">
        <h3 id="contact-general">Contact général</h3>
        <p className="_row">
          <Button href={`mailto:${config.email}`}>Écrire au label</Button>
        </p>
        <p className="__row textsize-small">{config.email}</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="contact-demos">
        <h3 id="contact-demos">Envoyer une démo</h3>
        <p className="_row">
          <Button
            href={`mailto:${config.demo_submission_email}?subject=${encodeURIComponent('Démo — Le Label Records')}`}
          >
            Envoyer une démo
          </Button>
        </p>
        <p className="__row textsize-small">{config.demo_submission_email}</p>
        <p className="__row textsize-regular-lh-small">
          Envoyez un lien d'écoute (Bandcamp, SoundCloud, Drive…), pas de pièce jointe :
          c'est plus écolo et plus rapide à écouter.
        </p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="contact-adresse">
        <h3 id="contact-adresse">Adresse</h3>
        <p className="_row">{config.address}</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="contact-reseaux">
        <h3 id="contact-reseaux">Réseaux</h3>
        <ul className="_row release-links">
          {Object.entries(config.social).map(([key, url]) => (
            <li key={key}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
