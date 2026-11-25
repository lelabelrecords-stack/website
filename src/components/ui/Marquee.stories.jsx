import Marquee from './Marquee.jsx'

export default {
  title: 'Le Label Records/Composants/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text', description: 'Contenu (aria-hidden, pause au survol, arrêt si reduced-motion)' }
  }
}

export const Defaut = { args: { text: 'K0RROBOR · Montevideo · Le Label² · Nîmes' } }
