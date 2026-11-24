export default function Label({ filled = false, children }) {
  return (
    <span className={`label${filled ? ' label--filled' : ''}`}>{children}</span>
  )
}
