import { usePageMeta } from '../seo.js'
import { news, byDateDesc, formatDate } from '../data.js'
import Hero from '../components/ui/Hero.jsx'
import ListItem from '../components/ui/ListItem.jsx'
import Button from '../components/ui/Button.jsx'

export default function News() {
  usePageMeta('News — Le Label Records', 'Actualités du Le Label Records : sorties, concerts, festivals et émission radio Le Label².')
  const sorted = [...news].sort(byDateDesc)

  return (
    <>
      <Hero title="News" />
      <ul className="flex-container _row">
        {sorted.map((n) => (
          <ListItem className="col-50 col-100-sp" key={n.title}>
            <p className="list-date">{formatDate(n.date) || 'À venir'}</p>
            <h3 className="__row">{n.title}</h3>
            <p className="__row textsize-regular-lh-small">{n.text}</p>
            {n.link ? (
              <p className="__row textsize-small">
                <Button href={n.link} target="_blank" rel="noopener noreferrer">En savoir plus</Button>
              </p>
            ) : (
              <p className="__row textsize-small"><Button to="/contact">Nous contacter</Button></p>
            )}
          </ListItem>
        ))}
      </ul>
    </>
  )
}
