import { useState } from 'react'
import { Link } from 'react-router-dom'
import { config, artistes, news, sorties, evenements, formatDate } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'
import Tab from '../components/ui/Tab.jsx'
import Label from '../components/ui/Label.jsx'
import Button from '../components/ui/Button.jsx'

const TAB_LABELS = {
  toutes: 'Toutes',
  actus: 'Actus',
  concert: 'Concerts',
  release: 'Releases',
  tournee: 'Tournées',
  festival: 'Festivals'
}

export default function Home() {
  const [tab, setTab] = useState('actus')
  const tabs = ['actus', ...[...new Set(evenements.map((e) => e.type))], 'toutes']
  const feed = [
    ...news.map((n) => ({ kind: 'news', date: n.date, item: n })),
    ...evenements.map((e) => ({ kind: 'event', date: e.date, item: e }))
  ].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })

  const filtered = feed.filter((f) =>
    tab === 'toutes' ? true : tab === 'actus' ? f.kind === 'news' : f.kind === 'event' && f.item.type === tab
  )

  const marqueeText = [
    ...artistes.map((a) => a.name),
    ...[...sorties].sort((a, b) => (b.date || '').localeCompare(a.date || '')).map((s) => `${s.artist} — ${s.title}`)
  ].join(' · ')

  return (
    <>
      <section className="hero" aria-label="Le Label Records">
        <h1 className="hero-title">Le Label<br />Records</h1>
        <p className="hero-sub">{config.baseline}</p>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{marqueeText}&nbsp;·&nbsp;</span>
          <span>{marqueeText}&nbsp;·&nbsp;</span>
        </div>
      </div>

      <section aria-labelledby="home-news" className="_row">
        <h2 id="home-news">News / Actualités</h2>
        <div className="tabs _row" role="tablist" aria-label="Catégories d'actualités">
          {tabs.map((t) => (
            <Tab key={t} selected={tab === t} controls="news-feed" onClick={() => setTab(t)}>
              {TAB_LABELS[t] || t}
            </Tab>
          ))}
        </div>
        <ul className="flex-container _row" id="news-feed" role="tabpanel" aria-label="Actualités filtrées">
          {filtered.map(({ kind, date, item }) => (
            <li className="list-item col-50 col-100-sp" key={`${kind}-${item.title}-${date || 'tba'}`}>
              <p className="list-date">
                {formatDate(date) || 'À venir'} — <Label>{kind === 'news' ? 'Actu' : item.type}</Label>{' '}
                {kind === 'news' ? (
                  item.link ? (
                    <Button href={item.link} target="_blank" rel="noopener noreferrer">En savoir plus</Button>
                  ) : (
                    <Button to="/contact">Nous contacter</Button>
                  )
                ) : (
                  item.link && (
                    <Button href={item.link} target="_blank" rel="noopener noreferrer">Lien</Button>
                  )
                )}
              </p>
              <h3 className="___row">{item.title}</h3>
              <p className="___row textsize-regular-lh-small">
                {kind === 'news' ? item.text : `${item.lieu}, ${item.ville}`}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Sorties" className="_row">
        <div className="flex-container _row">
          {[...sorties].sort((a, b) => {
            if (!a.date && !b.date) return 0
            if (!a.date) return 1
            if (!b.date) return -1
            return b.date.localeCompare(a.date)
          }).map((s) => (
            <ReleaseCard key={s.id} release={s} />
          ))}
        </div>
        <p className="_row"><Button to="/sorties">Toutes les sorties</Button></p>
      </section>

      <hr className="_row" />

      <section aria-labelledby="home-radio">
        <h2 id="home-radio">{config.radio.name} — à la radio</h2>
        <p className="_row textsize-regular-lh-small">{config.radio.tagline}</p>
        <ul className="_row">
          {config.radio.slots.map((slot) => (
            <li className="list-item" key={slot.label}>
              <h3 className="textsize-regular-lh-small"><strong>{slot.label}</strong></h3>
              <p className="__row textsize-regular-lh-small">{slot.detail}</p>
              <p className="__row textsize-small">
                <a href={slot.link} target="_blank" rel="noopener noreferrer">Écouter</a>
              </p>
            </li>
          ))}
        </ul>
        <p className="_row"><Button to="/radio">Tous les épisodes</Button></p>
      </section>
    </>
  )
}
