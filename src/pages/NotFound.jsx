import { usePageMeta } from '../seo.js'
import Hero from '../components/ui/Hero.jsx'
import Lead from '../components/ui/Lead.jsx'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  usePageMeta('Page introuvable — Le Label Records', "Cette page n'existe pas. Retour à l'accueil du Le Label Records.")
  return (
    <>
      <Hero title="Page introuvable" />
      <Lead className="_row">Cette page n'existe pas (ou plus).</Lead>
      <p className="_row"><Button to="/">Retour à l'accueil</Button></p>
    </>
  )
}
