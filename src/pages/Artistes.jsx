import { artistes, sorties } from '../data.js'

function releasesOf(artist) {
  return sorties.filter((s) => artist.sorties.includes(s.id))
}

export default function Artistes() {
  return (
    <>
      <h2>Artistes</h2>
      <p className="_row lead">Le roster du label.</p>

      {artistes.map((a) => {
        const rel = releasesOf(a)
        return (
          <section key={a.id} aria-labelledby={`artiste-${a.id}`}>
            <hr className="_row" />
            <div className="flex-container">
              <div className="col-33 col-50-tablet col-100-sp">
                <h3 id={`artiste-${a.id}`}>{a.name}</h3>
                <p className="__row">
                  <span className="label">{a.genre}</span>{' '}
                  <span className="label">{a.ville}</span>
                </p>
              </div>
              <div className="col-66 col-50-tablet col-100-sp">
                <p>{a.bio}</p>
                {rel.length > 0 && (
                  <p className="__row textsize-small">
                    Sorties : {rel.map((r) => r.title).join(', ')}
                  </p>
                )}
                <ul className="__row release-links">
                  {Object.entries(a.links).map(([key, url]) => (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {key === 'artiste' ? 'Page artiste' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {a.presse && a.presse.length > 0 && (
              <div className="flex-container _row presse">
                {a.presse.map((p) => (
                  <blockquote className="col-50 col-100-sp" key={p.source}>
                    <p>« {p.quote} »</p>
                    <cite>— {p.source}</cite>
                  </blockquote>
                ))}
              </div>
            )}
          </section>
        )
      })}
    </>
  )
}
