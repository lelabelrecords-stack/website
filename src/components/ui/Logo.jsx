export default function Logo({ className = '', label = 'Le Label Records' }) {
  return (
    <span
      className={`logo-svg${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={label}
    ></span>
  )
}
