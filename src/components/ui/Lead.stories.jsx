import Lead from './Lead.jsx'

export default {
  title: 'Le Label Records/Composants/Lead',
  component: Lead,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Souvent un spacer (ex. _row)' },
    children: { control: 'text', description: 'Chapô — graisse 900, taille fluide' }
  }
}

export const Defaut = { args: { className: '_row', children: 'Le roster du label.' } }
