import { formatDate } from '../data.js'
import Cover from './ui/Cover.jsx'
import Button from './ui/Button.jsx'

export default function ReleaseCard({ release }) {
  const { title, artist, date, type, note, links } = release
  const mainLink = links.listen || links.bandcamp || links.clip

  return (
    <article className="col-25 col-33-pc-small col-50-sp release">
      <Cover
        label={artist}
        href={mainLink}
        ariaLabel={`${artist} — ${title} : écouter`}
      />
      <div className="__row textsize-regular-lh-small">
        <p className="____row"><strong>{title}</strong> / {artist}</p>
        <p className="____row textsize-small">{type} · {formatDate(date) || 'À venir'}</p>
        {note && <p className="____row">{note}</p>}
        <ul className="____row release-links">
          {links.listen && (
            <li><Button href={links.listen} target="_blank" rel="noopener noreferrer">Écouter</Button></li>
          )}
          {links.clip && (
            <li><Button href={links.clip} target="_blank" rel="noopener noreferrer">Clip</Button></li>
          )}
          {links.bandcamp && (
            <li><Button href={links.bandcamp} target="_blank" rel="noopener noreferrer">Bandcamp</Button></li>
          )}
        </ul>
      </div>
    </article>
  )
}
