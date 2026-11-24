export default function Cover({ label, href, ariaLabel }) {
  const visual = (
    <div className="image-container is-product cover--red">
      <span className="image-label">{label}</span>
    </div>
  )

  if (href) {
    return (
      <a
        className="hover-image display-block"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {visual}
      </a>
    )
  }
  return visual
}
