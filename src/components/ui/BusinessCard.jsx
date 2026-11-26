import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { config } from '../../data.js'
import vcards from '../../../data/vcards.json'

export default function BusinessCard({ person, className = '' }) {
  const cls = `bcard${className ? ` ${className}` : ''}`
  return (
    <article className={cls} id={person.slug}>
      <div className="bcard__head">
        <Logo className="bcard__logo" />
        <p className="bcard__brand">
          Le Label Records
          <br />
          Label indépendant — Nîmes
        </p>
      </div>
      <div className="bcard__photo">
        <img src={`/vcard/${person.slug}.jpg`} alt={`Photo de ${person.fn}`} loading="lazy" />
      </div>
      <h3 className="bcard__name">
        {person.first}
        <br />
        {person.last}
      </h3>
      <p className="bcard__role">{person.title} · Le Label Records</p>
      <p className="bcard__verbatim">{vcards.verbatim}</p>
      <ul className="bcard__contacts">
        <li>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </li>
        <li>
          <a href={`tel:${person.telE164}`}>{person.tel}</a>
        </li>
        <li>{config.address}</li>
        <li>
          {config.radio.name} à la radio :{' '}
          {config.radio.slots.map((s, i) => (
            <span key={s.label}>
              {i > 0 && ' · '}
              <a href={s.link} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>{' '}
              ({s.detail})
            </span>
          ))}
        </li>
      </ul>
      <Button href={`/vcard/${person.slug}.vcf`} download={`${person.slug}.vcf`} className="bcard__cta">
        Ajouter à mes contacts
      </Button>
    </article>
  )
}
