import Label from '../components/ui/Label.jsx'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageMeta } from '../seo.js'
import { artistes, sorties } from '../data.js'

function releasesOf(artist) {
  return sorties.filter((s) => artist.sorties.includes(s.id))
}

export default function Artistes() {
  usePageMeta('Artistes — Le Label Records', 'Le roster du Le Label Records : Montevideo (post-punk, Nîmes), KØRROBOR (trio instrumental, Nîmes), Teknotrokids.')
  return (
    <>
      <Hero title="Artistes" />
      <Lead className="_row">Le roster du label.</Lead>

      {artistes.map((a) => {
        const rel = releasesOf(a)
        return (
          <section key={a.id} aria-labelledby={`artiste-${a.id}`}>
            <div className="flex-container _row">
              <div className="col-33 col-50-tablet col-100-sp">
                <h3 id={`artiste-${a.id}`}>{a.name}</h3>
                <p className="__row">
                  <Label>{a.genre}</Label>{' '}
                  <Label>{a.ville}</Label>
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
                      <Button href={url} target="_blank" rel="noopener noreferrer">
                        {key === 'artiste' ? 'Page artiste' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </Button>
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
