import Label from '../components/ui/Label.jsx'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageMeta } from '../seo.js'
import { evenements, formatDate } from '../data.js'

export default function Evenements() {
  usePageMeta('Événements — Le Label Records', 'Concerts, release parties, tournées et festivals organisés par le Le Label Records à Nîmes et en Occitanie.')
  const sorted = [...evenements].sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date.localeCompare(b.date)
  })

  return (
    <>
      <Hero title="Événements" />
      <Lead className="_row">Concerts, release parties, festivals.</Lead>
      <ul className="_row">
        {sorted.map((e) => (
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
                <Button href={e.link} target="_blank" rel="noopener noreferrer">Lien</Button>
              </p>
            )}
          </ListItem>
        ))}
      </ul>
    </>
  )
}
