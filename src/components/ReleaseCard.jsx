import { formatDateShort } from '../utils.js'

export default function ReleaseCard({ sortie }) {
  const links = Object.entries(sortie.links || {})
  return (
    <article className="col-25 col-33-pc-small col-50-sp card">
      <a
        className={`card__cover card__cover--${sortie.cover || 'red'}`}
        href={sortie.links?.bandcamp || sortie.links?.listen || '#'}
        target="_blank"
        rel="noreferrer"
      >
        <span className="card__cover-artist">{sortie.artist}</span>
        <span className="card__cover-title">{sortie.title}</span>
        <span className="card__cover-type">{sortie.type}</span>
      </a>
      <div className="card__meta">
        <p className="card__name">
          {sortie.artist} — {sortie.title}
        </p>
        <p className="card__sub">
          {sortie.type} · {formatDateShort(sortie.date)}
        </p>
        {sortie.note && <p className="card__note">{sortie.note}</p>}
        {links.length > 0 && (
          <p className="card__links">
            {links.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noreferrer">
                {key === 'listen' ? 'Écouter' : key === 'clip' ? 'Clip' : 'Bandcamp'} ↗
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  )
}
