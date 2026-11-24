import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <h1>Page introuvable</h1>
      <p className="_row lead">Cette page n'existe pas (ou plus).</p>
      <p className="_row"><Link to="/">Retour à l'accueil</Link></p>
    </>
  )
}
