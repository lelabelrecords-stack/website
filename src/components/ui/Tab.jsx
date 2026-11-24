export default function Tab({ selected, onClick, controls, children }) {
  const onKeyDown = (e) => {
    const list = e.currentTarget.closest('[role="tablist"]')
    if (!list) return
    const tabs = Array.from(list.querySelectorAll('[role="tab"]'))
    const i = tabs.indexOf(e.currentTarget)
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length]
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length]
    if (next) {
      e.preventDefault()
      next.focus()
      next.click()
    }
  }

  return (
    <button
      type="button"
      role="tab"
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      aria-controls={controls}
      className="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  )
}
