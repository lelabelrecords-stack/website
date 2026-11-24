import { evenements, formatDate } from '../data.js'

export default function Evenements() {
  const sorted = [...evenements].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date.localeCompare(b.date)
  })

  return (
    <>
      <h2>Événements</h2>
      <p className="_row lead">Concerts, release parties, festivals.</p>
      <ul className="row">
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
                <a href={e.link} target="_blank" rel="noopener noreferrer">Lien</a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
