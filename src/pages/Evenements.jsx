import { usePageMeta } from '../seo.js'
import { evenements, formatDate } from '../data.js'

export default function Evenements() {
  usePageMeta('Événements — Le Label Records', 'Concerts, release parties, tournées et festivals organisés par le Le Label Records à Nîmes et en Occitanie.')
  const sorted = [...evenements].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date.localeCompare(b.date)
  })

  return (
    <>
      <h1 className="hero-title">Événements</h1>
      <p className="_row lead">Concerts, release parties, festivals.</p>
      <ul className="_row">
        {sorted.map((e) => (
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
                <a className="button" href={e.link} target="_blank" rel="noopener noreferrer">Lien</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
