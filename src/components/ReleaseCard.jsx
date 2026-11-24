import { formatDate } from '../data.js'

export default function ReleaseCard({ release }) {
  const { title, artist, date, type, note, cover, links } = release
  const mainLink = links.listen || links.bandcamp || links.clip
  const coverClass = cover === 'black' ? 'cover--black' : 'cover--red'

  return (
    <article className="col-25 col-33-pc-small col-50-sp release">
      {mainLink ? (
        <a
          className="hover-image display-block"
          href={mainLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${artist} — ${title} : écouter`}
        >
          <div className="image-container is-product">
            <div className={`cover ${coverClass}`}>
              <img src="/assets/logo-contour-rouge-blanc.svg" alt="" aria-hidden="true" />
            </div>
            <span className="image-label">{type}</span>
          </div>
        </a>
      ) : (
        <div className="image-container is-product">
          <div className={`cover ${coverClass}`}>
            <img src="/assets/logo-contour-rouge-blanc.svg" alt="" aria-hidden="true" />
          </div>
          <span className="image-label">{type}</span>
        </div>
      )}
      <div className="__row textsize-regular-lh-small">
        <p className="____row"><strong>{title}</strong> / {artist}</p>
        <p className="____row textsize-small">{formatDate(date) || 'À venir'}</p>
        {note && <p className="____row">{note}</p>}
        <ul className="____row release-links">
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
      </div>
    </article>
  )
}
