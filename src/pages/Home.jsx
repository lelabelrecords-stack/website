import { Link } from 'react-router-dom'
import { config, news, sorties, evenements, formatDate } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'

export default function Home() {
  const feed = [
    ...news.map((n) => ({ kind: 'news', date: n.date, item: n })),
    ...evenements.map((e) => ({ kind: 'event', date: e.date, item: e }))
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })

  return (
    <>
      <section aria-labelledby="home-news">
        <h1 id="home-news">News / Actualités</h1>
        <ul className="flex-container _row">
          {feed.map(({ kind, date, item }) => (
            <li className="list-item col-50 col-100-sp" key={`${kind}-${item.title}-${date || 'tba'}`}>
              <p className="list-date">{formatDate(date) || 'À venir'}</p>
              <h2 className="__row">{item.title}</h2>
              {kind === 'news' ? (
                <>
                  <p className="__row textsize-regular-lh-small">{item.text}</p>
                  <p className="__row textsize-small">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">En savoir plus</a>
                    ) : (
                      <Link to="/contact">Nous contacter</Link>
                    )}
                  </p>
                </>
              ) : (
                <>
                  <p className="__row textsize-regular-lh-small">
                    {item.lieu}, {item.ville} — <span className="label">{item.type}</span>
                  </p>
                  {item.link && (
                    <p className="__row textsize-small">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">Lien</a>
                    </p>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="_row textsize-small">
          <Link to="/news">Toutes les news</Link> · <Link to="/evenements">Tous les événements</Link>
        </p>
      </section>

      <hr className="_row" />

      <section aria-label="Sorties">
        <div className="flex-container _row">
          {[...sorties].sort((a, b) => {
            if (!a.date && !b.date) return 0
            if (!a.date) return 1
            if (!b.date) return -1
            return b.date.localeCompare(a.date)
          }).map((s) => (
            <ReleaseCard key={s.id} release={s} />
          ))}
        </div>
        <p className="_row textsize-small"><Link to="/sorties">Toutes les sorties</Link></p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="home-radio">
        <h2 id="home-radio">{config.radio.name} — à la radio</h2>
        <p className="_row textsize-regular-lh-small">{config.radio.tagline}</p>
        <ul className="_row">
          {config.radio.slots.map((slot) => (
            <li className="list-item" key={slot.label}>
              <h3 className="textsize-regular-lh-small"><strong>{slot.label}</strong></h3>
              <p className="__row textsize-regular-lh-small">{slot.detail}</p>
              <p className="__row textsize-small">
                <a href={slot.link} target="_blank" rel="noopener noreferrer">Écouter</a>
              </p>
            </li>
          ))}
        </ul>
        <p className="_row textsize-small"><Link to="/radio">Tous les épisodes</Link></p>
      </section>
    </>
  )
}
