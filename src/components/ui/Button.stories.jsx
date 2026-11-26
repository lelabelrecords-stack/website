import { NavLink } from 'react-router-dom'
import Button from './Button.jsx'

export default {
  title: 'Le Label Records/Composants/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    to: { control: 'text', description: 'Lien interne (Link react-router)' },
    href: { control: 'text', description: 'Lien externe (ajouter target="_blank" rel="noopener noreferrer") — la flèche ↗ passe alors dans le coin interne supérieur droit du bouton' },
    children: { control: 'text', description: 'Intitulé — toujours explicite' }
  }
}

export const Interne = { args: { to: '/contact', children: 'Contact' } }
export const Externe = {
  args: { href: 'https://lelabelrecords.bandcamp.com/', children: 'Bandcamp' },
  render: (args) => <Button {...args} target="_blank" rel="noopener noreferrer" />
}
export const Actif = {
  render: () => (
    <nav className="site-nav" aria-label="Démo état actif">
      <ul style={{ display: 'flex', gap: '10px' }}>
        <li><NavLink to="/" end className="button">Accueil (rempli, aria-current="page")</NavLink></li>
        <li><NavLink to="/contact" className="button">Contact</NavLink></li>
      </ul>
    </nav>
  )
}
