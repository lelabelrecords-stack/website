import { sorties, byDateDesc } from '../data.js'
import ReleaseCard from '../components/ReleaseCard.jsx'

export default function Sorties() {
  const sorted = [...sorties].sort(byDateDesc)

  return (
    <>
      <h2>Sorties</h2>
      <p className="_row lead">Le catalogue du label, aussi sur Bandcamp.</p>
      <div className="flex-container row">
        {sorted.map((s) => (
          <ReleaseCard key={s.id} release={s} />
        ))}
      </div>
    </>
  )
}
