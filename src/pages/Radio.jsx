import { usePageMeta } from '../seo.js'
import { config } from '../data.js'

export default function Radio() {
  usePageMeta('Le Label² — Le Label Records', "L'émission radio du Le Label Records : un label indépendant, une heure, les morceaux qui le définissent. Sur Rayvox, Raje et Radio Alliance +.")
  const { radio } = config

  return (
    <>
      <h1>{radio.name}</h1>
      <p className="_row lead">{radio.tagline}</p>

      <hr className="_row" />

      <section aria-labelledby="radio-slots">
        <h3 id="radio-slots">À l'antenne</h3>
        <ul className="_row">
          {radio.slots.map((slot) => (
            <li className="list-item" key={slot.label}>
              <h3 className="textsize-regular-lh-small"><strong>{slot.label}</strong></h3>
              <p className="__row textsize-regular-lh-small">{slot.detail}</p>
              <p className="__row">
                <a className="button" href={slot.link} target="_blank" rel="noopener noreferrer">Accéder aux émissions</a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="radio-episodes">
        <h3 id="radio-episodes">Épisodes</h3>
        <ul className="_row">
          {radio.episodes.map((ep) => (
            <li className="list-item" key={ep.n}>
              <p className="list-date">Épisode #{ep.n}</p>
              <h3 className="__row">{ep.label}</h3>
              <p className="__row textsize-regular-lh-small">{ep.place}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
