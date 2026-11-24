import { Link } from 'react-router-dom'
import { config, news, sorties, evenements, byDateDesc, formatDate, upcomingEvents } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'

export default function Home() {
  const latestNews = [...news].sort(byDateDesc).slice(0, 3)
  const latestSorties = [...sorties].sort(byDateDesc).slice(0, 4)
  const nextEvents = upcomingEvents(evenements, 4)

  return (
    <>
      <section className="flex-container" aria-label="Présentation du label">
        <div className="col-50 col-100-sp hero-logo">
          <img
            src="/assets/logo-contour-rouge.svg"
            alt="Logo contour rouge du Le Label Records"
            width="200"
            height="268"
          />
        </div>
        <div className="col-50 col-100-sp">
          <p className="lead"><strong>{config.label_name}</strong></p>
          <p className="_row">{config.baseline}</p>
          <p className="_row textsize-regular-lh-small">{config.description}</p>
        </div>
      </section>

      <hr className="row" />

      <section aria-labelledby="home-news">
        <h2 id="home-news">À la une</h2>
        <ul className="_row">
          {latestNews.map((n) => (
            <li className="list-item" key={n.title}>
              <p className="list-date">{formatDate(n.date) || 'À venir'}</p>
              <h3 className="__row">{n.title}</h3>
              <p className="__row textsize-regular-lh-small">{n.text}</p>
              {n.link && (
                <p className="__row textsize-small">
                  <a href={n.link} target="_blank" rel="noopener noreferrer">En savoir plus</a>
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="_row textsize-small"><Link to="/news">Toutes les news</Link></p>
      </section>

      <hr className="row" />

      <section aria-labelledby="home-sorties">
        <h2 id="home-sorties">Sorties récentes</h2>
        <div className="flex-container _row">
          {latestSorties.map((s) => (
            <ReleaseCard key={s.id} release={s} />
          ))}
        </div>
        <p className="_row textsize-small"><Link to="/sorties">Toutes les sorties</Link></p>
      </section>

      <hr className="row" />

      <section aria-labelledby="home-events">
        <h2 id="home-events">Prochains événements</h2>
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
              {e.link && (
                <p className="__row textsize-small">
                  <a href={e.link} target="_blank" rel="noopener noreferrer">Lien</a>
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="_row textsize-small"><Link to="/evenements">Tous les événements</Link></p>
      </section>

      <hr className="row" />

      <section aria-labelledby="home-radio">
        <h2 id="home-radio">{config.radio.name} — à la radio</h2>
        <p className="_row lead">{config.radio.tagline}</p>
        <ul className="_row">
          {config.radio.slots.map((slot) => (
            <li className="list-item" key={slot.label}>
              <h3>{slot.label}</h3>
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
