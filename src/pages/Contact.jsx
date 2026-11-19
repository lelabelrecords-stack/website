import config from '../../data/config.json'
import NewsletterForm from '../components/NewsletterForm.jsx'

export default function Contact() {
  return (
    <>
      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Contact <span>//</span> écrire au label</h2>
          </div>
          <div className="contact__grid">
            <div className="contact__block">
              <h3>Boîte officielle</h3>
              <p>
                Artistes, presse, partenaires, lieux de concert :<br />
                <a href={`mailto:${config.email}`}>{config.email}</a>
              </p>
            </div>
            <div className="contact__block">
              <h3>Démos</h3>
              <p>
                Envoyez vos démos à :<br />
                <a href={`mailto:${config.demo_submission_email}`}>{config.demo_submission_email}</a>
              </p>
            </div>
            <div className="contact__block">
              <h3>Adresse</h3>
              <p>{config.address}</p>
            </div>
            <div className="contact__block">
              <h3>Réseaux & écoute</h3>
              <p>
                <a href={config.social.linktree} target="_blank" rel="noreferrer">linktr.ee/le.label</a><br />
                <a href={config.social.bandcamp} target="_blank" rel="noreferrer">lelabelrecords.bandcamp.com</a><br />
                <a href={config.social.youtube} target="_blank" rel="noreferrer">YouTube — clip « Brawn »</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section newsletter" id="newsletter">
        <div className="row">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
