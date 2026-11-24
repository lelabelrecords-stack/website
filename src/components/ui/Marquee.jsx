export default function Marquee({ text }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{text}&nbsp;·&nbsp;</span>
        <span>{text}&nbsp;·&nbsp;</span>
      </div>
    </div>
  )
}
