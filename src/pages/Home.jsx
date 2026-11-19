import { Link } from 'react-router-dom'
import config from '../../data/config.json'
import sorties from '../../data/sorties.json'
import artistes from '../../data/artistes.json'
import news from '../../data/news.json'
import ReleaseCard from '../components/ReleaseCard.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { formatDate, formatDateShort } from '../utils.js'

export default function Home() {
  const latest = [...sorties].sort((a, b) => (b.date || '9999').localeCompare(a.date || '9999'))
  const aLaUne = latest[0]
  const aVenir = [...sorties].sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))
  const prochaine = aVenir.find((s) => s.date && s.date >= '2026-11-01') || aVenir[aVenir.length - 1]
  const lastNews = [...news].sort((a, b) => (b.date || '0000').localeCompare(a.date || '0000'))

  return (
    <>
      <section className="hero">
        <div className="row">
          <p className="hero__kicker">{config.baseline}</p>
          <h1 className="hero__title">
            Le Label<span style={{ color: '#db0000' }}>²</span>
            <br />
            en musique.
          </h1>
          <p className="hero__sub">{config.description}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={config.social.bandcamp} target="_blank" rel="noreferrer">
              Écouter le catalogue ↗
            </a>
            <Link className="btn" to="/artistes">Les artistes</Link>
            <Link className="btn" to="/evenements">Les dates</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Prochaine sortie <span>//</span> {prochaine.title}</h2>
            <Link className="section__more" to="/sorties">Toutes les sorties →</Link>
          </div>
          <p className="prose">
            <strong>{prochaine.artist}</strong> — {prochaine.type} · {formatDate(prochaine.date)}. {prochaine.note}
          </p>
          {aLaUne && aLaUne.id !== prochaine.id && (
            <p className="prose">
              Dernière sortie : <strong>{aLaUne.artist} — {aLaUne.title}</strong> ({formatDateShort(aLaUne.date)}).
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Sorties <span>//</span> catalogue</h2>
            <Link className="section__more" to="/sorties">Tout voir →</Link>
          </div>
          <div className="row" style={{ padding: 0 }}>
            {latest.slice(0, 4).map((s) => (
              <ReleaseCard key={s.id} sortie={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">News <span>//</span> le label</h2>
          </div>
          <ul className="news__list">
            {lastNews.map((n, i) => (
              <li className="news__item" key={i}>
                <span className="news__date">{n.date ? formatDateShort(n.date) : 'actus'}</span>
                <div className="news__body">
                  <p className="news__title">
                    {n.link ? <a href={n.link} target="_blank" rel="noreferrer">{n.title}</a> : n.title}
                  </p>
                  <p className="news__text">{n.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Artistes <span>//</span> roster</h2>
            <Link className="section__more" to="/artistes">Tous les artistes →</Link>
          </div>
          <div className="row" style={{ padding: 0 }}>
            {artistes.map((a) => (
              <article className="col-33-pc-small col-50-sp card" key={a.id}>
                <Link className={`card__cover card__cover--${a.id === 'vision' ? 'black' : 'red'}`} to="/artistes">
                  <span className="card__cover-artist">{a.genre} — {a.ville}</span>
                  <span className="card__cover-title">{a.name}</span>
                  <span className="card__cover-type">voir →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section radio">
        <div className="row">
          <div className="section__head">
            <h2 className="section__title">Le Label² <span>//</span> à la radio</h2>
          </div>
          <p className="radio__tagline">{config.radio.tagline}</p>
          <div className="radio__slots">
            {config.radio.slots.map((s) => (
              <p key={s.label}>
                <a href={s.link} target="_blank" rel="noreferrer"><strong>{s.label}</strong></a> — {s.detail}
              </p>
            ))}
          </div>
          <ul className="radio__episodes">
            {config.radio.episodes.map((e) => (
              <li key={e.n}>
                Épisode #{e.n} — <strong>{e.label}</strong> · {e.place}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section newsletter" id="newsletter">
        <div className="row">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
