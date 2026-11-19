import evenements from '../../data/evenements.json'
import config from '../../data/config.json'
import { formatDate } from '../utils.js'

const TYPE_LABEL = {
  concert: 'Concert',
  release: 'Release party',
  tournee: 'Tournée',
  festival: 'Festival'
}

export default function Evenements() {
  const sorted = [...evenements].sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))
  return (
    <>
      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Événements <span>//</span> dates</h2>
          </div>
          <ul className="events__list">
            {sorted.map((e, i) => (
              <li className="events__item" key={i}>
                <span className="events__date">
                  {e.dateEnd ? `${formatDate(e.date)} → ${formatDate(e.dateEnd)}` : formatDate(e.date)}
                </span>
                <div>
                  {e.link ? (
                    <p className="events__title"><a href={e.link} target="_blank" rel="noreferrer">{e.title}</a></p>
                  ) : (
                    <p className="events__title">{e.title}</p>
                  )}
                  <p className="events__place">{e.lieu} · {e.ville}</p>
                </div>
                <span className="events__type">{TYPE_LABEL[e.type] || e.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section radio">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Le Label² <span>//</span> à la radio</h2>
          </div>
          <p className="radio__tagline">{config.radio.tagline}</p>
          <div className="radio__slots">
            {config.radio.slots.map((s) => (
              <p key={s.label}>
                <a href={s.link} target="_blank" rel="noreferrer"><strong>{s.label}</strong></a> — {s.detail}
              </p>
            ))}
          </div>
          <ul className="radio__episodes">
            {config.radio.episodes.map((e) => (
              <li key={e.n}>
                Épisode #{e.n} — <strong>{e.label}</strong> · {e.place}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
