import { config } from '../data.js'

export default function Contact() {
  return (
    <>
      <h1>Contact</h1>

      <section aria-labelledby="contact-general" className="_row">
        <h3 id="contact-general">Contact général</h3>
        <p className="_row">
          <a className="button" href={`mailto:${config.email}`}>Écrire au label</a>
        </p>
        <p className="__row textsize-small">{config.email}</p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="contact-demos">
        <h3 id="contact-demos">Envoyer une démo</h3>
        <p className="_row">
          <a
            className="button button--ghost"
            href={`mailto:${config.demo_submission_email}?subject=${encodeURIComponent('Démo — Le Label Records')}`}
          >
            Envoyer une démo
          </a>
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
          <li><a href={config.social.bandcamp} target="_blank" rel="noopener noreferrer">Bandcamp</a></li>
          <li><a href={config.social.linktree} target="_blank" rel="noopener noreferrer">Linktree</a></li>
          <li><a href={config.social.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
          <li><a href={config.social.kaardinal_publishing} target="_blank" rel="noopener noreferrer">Kaardinal Publishing</a></li>
        </ul>
      </section>
    </>
  )
}
