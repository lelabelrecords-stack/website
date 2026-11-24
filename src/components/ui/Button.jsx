import { Link } from 'react-router-dom'

export default function Button({ to, href, children, className = '', ...rest }) {
  const cls = `button${className ? ` ${className}` : ''}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  )
}
