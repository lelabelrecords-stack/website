import { Link } from 'react-router-dom'
import { config, news, sorties, evenements, byDateDesc, formatDate, upcomingEvents } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'

export default function Home() {
  const latestNews = [...news].sort(byDateDesc)
  const nextEvents = upcomingEvents(evenements, 4)
  const bannerEvent = nextEvents[0]

  return (
    <>
      <section aria-labelledby="home-news">
        <h1 id="home-news">News / Actualités</h1>
        <ul className="_row">
          {latestNews.map((n) => (
            <li className="list-item" key={n.title}>
              <p className="list-date">{formatDate(n.date) || 'À venir'}</p>
              <h3 className="__row">{n.title}</h3>
              <p className="__row textsize-regular-lh-small">{n.text}</p>
              <p className="__row textsize-small">
                {n.link ? (
                  <a href={n.link} target="_blank" rel="noopener noreferrer">En savoir plus</a>
                ) : (
                  <Link to="/contact">Nous contacter</Link>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <hr className="_row" />

      {bannerEvent && (
        <section aria-label="Prochain événement">
          <p className="textsize-small">Coming Soon / À venir</p>
          <h2 className="___row">{bannerEvent.title}</h2>
          <p className="___row">
            <strong>
              {formatDate(bannerEvent.date) || 'Date à confirmer'}
              {bannerEvent.dateEnd ? ` — ${formatDate(bannerEvent.dateEnd)}` : ''}
            </strong>
          </p>
          <p className="___row textsize-regular-lh-small">
            {bannerEvent.lieu}, {bannerEvent.ville} — <span className="label">{bannerEvent.type}</span>
          </p>
          <p className="___row textsize-small">
            {bannerEvent.link && (
              <>
                <a href={bannerEvent.link} target="_blank" rel="noopener noreferrer">Lien</a>
                {' · '}
              </>
            )}
            <Link to="/evenements">Tous les événements</Link>
          </p>
        </section>
      )}

      <hr className="_row" />

      <section aria-label="Sorties">
        <div className="flex-container _row">
          {[...sorties].sort(byDateDesc).map((s) => (
            <ReleaseCard key={s.id} release={s} />
          ))}
        </div>
        <p className="_row textsize-small"><Link to="/sorties">Toutes les sorties</Link></p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="home-events">
        <h2 id="home-events">Événements</h2>
        <ul className="_row">
          {nextEvents.map((e) => (
            <li className="list-item" key={`${e.title}-${e.date || 'tba'}`}>
              <p className="list-date">
                {formatDate(e.date) || 'Date à confirmer'}
                {e.dateEnd ? ` — ${formatDate(e.dateEnd)}` : ''}
              </p>
              <h3 className="__row">{e.title}</h3>
              <p className="__row textsize-regular-lh-small">
                {e.lieu}, {e.ville} — <span className="label">{e.type}</span>
              </p>
            </li>
          ))}
        </ul>
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
