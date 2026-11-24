import { formatDate } from '../data.js'

export default function ReleaseCard({ release }) {
  const { title, artist, date, type, note, cover, links } = release
  const mainLink = links.listen || links.bandcamp || links.clip

  return (
    <article className="col-25 col-33-pc-small col-50-sp">
      {mainLink ? (
        <a
          className={`cover cover--${cover}`}
          href={mainLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${artist} — ${title} : écouter`}
        >
          <img src="/assets/logo-contour-rouge-blanc.svg" alt="" aria-hidden="true" />
          <span className="cover-title">{title}</span>
          <span className="cover-artist">{artist}</span>
        </a>
      ) : (
        <div className={`cover cover--${cover}`}>
          <img src="/assets/logo-contour-rouge-blanc.svg" alt="" aria-hidden="true" />
          <span className="cover-title">{title}</span>
          <span className="cover-artist">{artist}</span>
        </div>
      )}
      <p className="__row textsize-small">
        {type}
        {date ? ` — ${formatDate(date)}` : ' — à venir'}
      </p>
      {note && <p className="__row textsize-regular-lh-small">{note}</p>}
      <ul className="__row release-links">
        {links.listen && (
          <li><a href={links.listen} target="_blank" rel="noopener noreferrer">Écouter</a></li>
        )}
        {links.clip && (
          <li><a href={links.clip} target="_blank" rel="noopener noreferrer">Clip</a></li>
        )}
        {links.bandcamp && (
          <li><a href={links.bandcamp} target="_blank" rel="noopener noreferrer">Bandcamp</a></li>
        )}
      </ul>
    </article>
  )
}
