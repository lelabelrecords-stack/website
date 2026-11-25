import rawConfig from '../data/config.json'
import rawArtistes from '../data/artistes.json'
import rawSorties from '../data/sorties.json'
import rawEvenements from '../data/evenements.json'
import rawNews from '../data/news.json'

const visible = (list) => list.filter((x) => !x.hidden)

export const config = rawConfig
export const artistes = visible(rawArtistes)
export const sorties = visible(rawSorties)
export const evenements = visible(rawEvenements)
export const news = visible(rawNews)

const dateFmt = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

export function formatDate(iso) {
  if (!iso) return null
  return dateFmt.format(new Date(`${iso}T12:00:00`))
}

export function byDateDesc(a, b) {
  if (!a.date && !b.date) return 0
  if (!a.date) return 1
  if (!b.date) return -1
  return b.date.localeCompare(a.date)
}

export function upcomingEvents(list, count) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return [...list]
    .filter((e) => !e.date || new Date(`${e.date}T12:00:00`) >= today)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return a.date.localeCompare(b.date)
    })
    .slice(0, count)
}

export function pastEvents(list) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return [...list]
    .filter((e) => e.date && new Date(`${e.date}T12:00:00`) < today)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function eventLinkLabel(e) {
  return e.linkLabel || (e.type === 'concert' ? 'Billetterie' : 'Infos')
}
