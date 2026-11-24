export default function Lead({ className = '', children }) {
  return <p className={`lead${className ? ` ${className}` : ''}`}>{children}</p>
}
