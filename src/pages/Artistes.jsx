import artistes from '../../data/artistes.json'

export default function Artistes() {
  return (
    <section className="section">
      <div className="row">
        <div className="section__head">
          <h2 className="section__title">Artistes <span>//</span> roster</h2>
        </div>
        {artistes.map((a) => (
          <article className="artist" key={a.id}>
            <div className="artist__head">
              <h3 className="artist__name">{a.name}</h3>
              <span className="artist__tag">{a.genre} — {a.ville}</span>
            </div>
            <p className="artist__bio">{a.bio}</p>
            <div className="artist__links">
              {Object.entries(a.links || {}).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noreferrer">
                  {key} ↗
                </a>
              ))}
            </div>
            {a.presse && (
              <div className="presse">
                {a.presse.map((p, i) => (
                  <blockquote key={i}>
                    <p>« {p.quote} »</p>
                    <cite>{p.source}</cite>
                  </blockquote>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
