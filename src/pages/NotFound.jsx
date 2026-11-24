import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h2>Page introuvable</h2>
      <p className="_row lead">Cette page n'existe pas (ou plus).</p>
      <p className="_row"><Link to="/">Retour à l'accueil</Link></p>
    </>
  )
}
