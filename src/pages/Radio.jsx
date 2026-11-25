import { usePageMeta } from '../seo.js'
import { config } from '../data.js'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Button from '../components/ui/Button.jsx'

export default function Radio() {
  usePageMeta('Le Label² — Le Label Records', "L'émission radio du Le Label Records : un label indépendant, une heure, les morceaux qui le définissent. Sur Rayvox, Raje et Radio Alliance +.")
  const { radio } = config

  return (
    <>
      <Hero title={radio.name} />
      <Lead className="_row">{radio.tagline}</Lead>

      <hr className="_row" />

      <section aria-labelledby="radio-slots">
        <h3 id="radio-slots">À l'antenne</h3>
        <ul className="_row">
          {radio.slots.map((slot) => (
            <ListItem key={slot.label}>
              <h3 className="textsize-regular-lh-small"><strong>{slot.label}</strong></h3>
              <p className="__row textsize-regular-lh-small">{slot.detail}</p>
              <p className="__row">
                <Button href={slot.link} target="_blank" rel="noopener noreferrer">Écouter sur {slot.label}</Button>
              </p>
            </ListItem>
          ))}
        </ul>
      </section>

      <hr className="_row" />

      <section aria-labelledby="radio-episodes">
        <h3 id="radio-episodes">Épisodes</h3>
        <ul className="_row">
          {radio.episodes.map((ep) => (
            <ListItem key={ep.n}>
              <p className="list-date">Épisode #{ep.n}</p>
              <h3 className="__row">{ep.label}</h3>
              <p className="__row textsize-regular-lh-small">{ep.place}</p>
              {ep.link && (
                <p className="__row textsize-small">
                  <Button href={ep.link} target="_blank" rel="noopener noreferrer">Écouter l'épisode</Button>
                </p>
              )}
            </ListItem>
          ))}
        </ul>
      </section>
    </>
  )
}
