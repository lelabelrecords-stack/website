import { usePageMeta, useJsonLd } from '../seo.js'
import { sorties, byDateDesc } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'

export default function Sorties() {
  usePageMeta('Sorties — Le Label Records', 'Le catalogue du Le Label Records : singles, EP et LP, écoutables sur Bandcamp et en distribution digitale via WiseBand.')
  const sorted = [...sorties].sort(byDateDesc)
  useJsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catalogue du Le Label Records',
    itemListElement: sorted.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': s.type === 'Single' ? 'MusicRecording' : 'MusicAlbum',
        name: s.title,
        byArtist: { '@type': 'MusicGroup', name: s.artist },
        datePublished: s.date || undefined,
        url: s.links?.bandcamp || 'https://le-label.org/sorties'
      }
    }))
  })

  return (
    <>
      <Hero title="Sorties" />
      <Lead className="_row">Le catalogue du label, aussi sur Bandcamp.</Lead>
      <div className="flex-container _row">
        {sorted.map((s) => (
          <ReleaseCard key={s.id} release={s} />
        ))}
      </div>
    </>
  )
}
