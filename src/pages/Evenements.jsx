import Label from '../components/ui/Label.jsx'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageMeta, useJsonLd } from '../seo.js'
import { evenements, formatDate, upcomingEvents, pastEvents, eventLinkLabel } from '../data.js'

export default function Evenements() {
  usePageMeta('Événements — Le Label Records', 'Concerts, release parties, tournées et festivals organisés par le Le Label Records à Nîmes et en Occitanie.')
  const upcoming = upcomingEvents(evenements)
  const past = pastEvents(evenements)
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Événements du Le Label Records',
    itemListElement: upcoming.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: e.title,
        startDate: e.date || undefined,
        endDate: e.dateEnd || undefined,
        location: { '@type': 'Place', name: e.lieu, address: { '@type': 'PostalAddress', addressLocality: e.ville, addressCountry: 'FR' } },
        organizer: { '@type': 'MusicGroup', name: 'Le Label Records', url: 'https://le-label.org' },
        url: e.link || 'https://le-label.org/evenements'
      }
    }))
  })

  const renderEvent = (e) => (
    <ListItem key={`${e.title}-${e.date || 'tba'}`}>
      <p className="list-date">
        {formatDate(e.date) || 'Date à confirmer'}
        {e.dateEnd ? ` — ${formatDate(e.dateEnd)}` : ''}
      </p>
      <h3 className="__row">{e.title}</h3>
      <p className="__row textsize-regular-lh-small">
        {e.lieu}, {e.ville} — <Label>{e.type}</Label>
      </p>
      {e.link && (
        <p className="__row textsize-small">
          <Button href={e.link} target="_blank" rel="noopener noreferrer">{eventLinkLabel(e)}</Button>
        </p>
      )}
    </ListItem>
  )

  return (
    <>
      <Hero title="Événements" />
      <Lead className="_row">Concerts, release parties, festivals.</Lead>

      <h2 className="_row">Prochains événements</h2>
      <ul className="_row">
        {upcoming.map(renderEvent)}
      </ul>

      {past.length > 0 && (
        <>
          <hr className="_row" />
          <h2 className="_row">Événements passés</h2>
          <ul className="_row">
            {past.map(renderEvent)}
          </ul>
        </>
      )}
    </>
  )
}
