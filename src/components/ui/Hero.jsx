export default function Hero({ title, sub, actions }) {
  return (
    <section className="hero">
      <h1 className="hero-title">{title}</h1>
      {sub ? <p className="hero-sub">{sub}</p> : null}
      {actions ? <div className="hero-actions">{actions}</div> : null}
    </section>
  )
}
