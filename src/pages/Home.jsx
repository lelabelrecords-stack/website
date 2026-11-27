import { useState } from 'react'
import { config, artistes, news, sorties, evenements, formatDate, upcomingEvents, eventLinkLabel } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'
import Hero from '../components/ui/Hero.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import Tab from '../components/ui/Tab.jsx'
import Label from '../components/ui/Label.jsx'
import Button from '../components/ui/Button.jsx'
import ListItem from '../components/ui/ListItem.jsx'

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
    ...upcomingEvents(evenements).map((e) => ({ kind: 'event', date: e.date, item: e }))
  ].map((f) => ({
    ...f,
    cta: !f.item.link
      ? null
      : { href: f.item.link, label: f.kind === 'news' ? 'En savoir plus' : eventLinkLabel(f.item) }
  })).sort((a, b) => {
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

  const sortedReleases = [...sorties].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })
  const lastEpisode = [...config.radio.episodes].sort((a, b) => b.n - a.n)[0]

  return (
    <>
      <Hero
        title={<>Le Label<br />Records</>}
        sub={config.baseline}
        actions={(
          <>
            <Button to="/sorties">Voir les sorties</Button>
            {lastEpisode?.link && (
              <Button href={lastEpisode.link} target="_blank" rel="noopener noreferrer">
                Écouter le dernier épisode
              </Button>
            )}
          </>
        )}
      />

      <Marquee text={marqueeText} />

      <section aria-labelledby="home-news" className="_row">
        <h2 id="home-news">News / Actualités</h2>
        <div className="tabs _row" role="tablist" aria-label="Catégories d'actualités">
          {tabs.map((t) => (
            <Tab key={t} selected={tab === t} controls="news-feed" onClick={() => setTab(t)}>
              {TAB_LABELS[t] || t}
            </Tab>
          ))}
        </div>
        <h3 id="news-feed-title" className="_row">Fil d’actus</h3>
        <ul className="flex-container _row" id="news-feed" role="tabpanel" aria-labelledby="news-feed-title">
          {filtered.map(({ kind, date, item, cta }) => (
            <ListItem className="col-33 col-100-sp" key={`${kind}-${item.title}-${date || 'tba'}`}>
              <p className="list-date">
                {formatDate(date) || 'À venir'} — <Label>{kind === 'news' ? 'Actu' : item.type}</Label>{' '}
                {cta && (
                  <Button href={cta.href} target="_blank" rel="noopener noreferrer">{cta.label}</Button>
                )}
              </p>
              <h3 className="___row">{item.title}</h3>
              <p className="___row textsize-regular-lh-small">
                {kind === 'news' ? item.text : `${item.lieu}, ${item.ville}`}
              </p>
            </ListItem>
          ))}
        </ul>
      </section>

      <section aria-label="Sorties" className="_row">
        <div className="flex-container _row">
          {sortedReleases.slice(0, 3).map((s) => (
            <ReleaseCard key={s.id} release={s} />
          ))}
        </div>
        <p className="_row"><Button to="/sorties">Toutes les sorties</Button></p>
      </section>

      <section aria-labelledby="home-radio" className="_row">
        <h2 id="home-radio">{config.radio.name} — à la radio</h2>
        <p className="_row textsize-regular-lh-small">{config.radio.tagline}</p>
        <ul className="flex-container _row">
          {config.radio.slots.map((slot) => (
            <ListItem key={slot.label} className="col-33 col-100-sp">
              <h3><strong>{slot.label}</strong></h3>
              <p className="__row textsize-regular-lh-small">{slot.detail}</p>
              <p className="__row">
                <Button href={slot.link} target="_blank" rel="noopener noreferrer">Écouter</Button>
              </p>
            </ListItem>
          ))}
        </ul>
        <p className="_row"><Button to="/radio">Tous les épisodes</Button></p>
      </section>
    </>
  )
}
