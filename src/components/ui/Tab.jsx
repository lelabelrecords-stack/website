export default function Tab({ selected, onClick, controls, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-controls={controls}
      className={`tab${selected ? ' is-active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
