export default function ListItem({ className = '', children, ...rest }) {
  return (
    <li className={`list-item${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </li>
  )
}
