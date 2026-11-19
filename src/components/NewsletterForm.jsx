import { useState } from 'react'
import config from '../../data/config.json'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    window.location.href = `mailto:${config.demo_submission_email}?subject=${encodeURIComponent(
      'Inscription newsletter — Le Label Records'
    )}&body=${encodeURIComponent(`Bonjour,\n\ninscrivez ${email} à la newsletter du Label.\n\nMerci !`)}`
    setSent(true)
  }

  return (
    <form className="newsletter__form" onSubmit={submit}>
      <label className="newsletter__label" htmlFor="newsletter-email">
        S'inscrire à la newsletter
      </label>
      <div className="newsletter__row">
        <input
          id="newsletter-email"
          className="form-input newsletter__input"
          type="email"
          required
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="form-button newsletter__button" type="submit">
          S'inscrire
        </button>
      </div>
      {sent && <p className="newsletter__hint">Votre client mail s'ouvre — envoyez pour confirmer.</p>}
    </form>
  )
}
