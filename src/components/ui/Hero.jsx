export default function Hero({ title, sub }) {
  return (
    <section className="hero">
      <h1 className="hero-title">{title}</h1>
      {sub ? <p className="hero-sub">{sub}</p> : null}
    </section>
  )
}
