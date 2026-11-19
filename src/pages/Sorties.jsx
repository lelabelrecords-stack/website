import sorties from '../../data/sorties.json'
import config from '../../data/config.json'
import ReleaseCard from '../components/ReleaseCard.jsx'

export default function Sorties() {
  const sorted = [...sorties].sort((a, b) => (b.date || '9999').localeCompare(a.date || '9999'))
  return (
    <section className="section">
      <div className="row">
        <div className="section__head">
          <h2 className="section__title">Sorties <span>//</span> catalogue</h2>
          <a className="section__more" href={config.social.bandcamp} target="_blank" rel="noreferrer">
            Tout le catalogue sur Bandcamp ↗
          </a>
        </div>
        <div className="row" style={{ padding: 0 }}>
          {sorted.map((s) => (
            <ReleaseCard key={s.id} sortie={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
