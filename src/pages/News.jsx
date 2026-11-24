import { Link } from 'react-router-dom'
import { news, byDateDesc, formatDate } from '../data.js'

export default function News() {
  const sorted = [...news].sort(byDateDesc)

  return (
    <>
      <h2>News</h2>
      <ul className="row">
        {sorted.map((n) => (
          <li className="list-item" key={n.title}>
            <p className="list-date">{formatDate(n.date) || 'À venir'}</p>
            <h3 className="__row">{n.title}</h3>
            <p className="__row textsize-regular-lh-small">{n.text}</p>
            {n.link ? (
              <p className="__row textsize-small">
                <a href={n.link} target="_blank" rel="noopener noreferrer">En savoir plus</a>
              </p>
            ) : (
              <p className="__row textsize-small"><Link to="/contact">Nous contacter</Link></p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
