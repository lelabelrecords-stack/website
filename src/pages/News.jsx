import { Link } from 'react-router-dom'
import { news, byDateDesc, formatDate } from '../data.js'

export default function News() {
  const sorted = [...news].sort(byDateDesc)

  return (
    <>
      <h1>News</h1>
      <ul className="flex-container _row">
        {sorted.map((n) => (
          <li className="list-item col-50 col-100-sp" key={n.title}>
            <p className="list-date">{formatDate(n.date) || 'À venir'}</p>
            <h3 className="__row">{n.title}</h3>
            <p className="__row textsize-regular-lh-small">{n.text}</p>
            {n.link ? (
              <p className="__row textsize-small">
                <a className="button" href={n.link} target="_blank" rel="noopener noreferrer">En savoir plus</a>
              </p>
            ) : (
              <p className="__row textsize-small"><Link className="button" to="/contact">Nous contacter</Link></p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
