import BusinessCard from './BusinessCard.jsx'
import vcards from '../../../data/vcards.json'

export default {
  title: 'Le Label Records/Composants/BusinessCard',
  component: BusinessCard,
  tags: ['autodocs'],
  argTypes: {
    person: {
      control: 'object',
      description: 'Entrée de data/vcards.json (slug, first, last, fn, title, email, tel, telE164) — photo /vcard/<slug>.jpg, vCard /vcard/<slug>.vcf'
    },
    className: { control: 'text' }
  }
}

export const Christophe = { args: { person: vcards.people[0] } }
export const Roxane = { args: { person: vcards.people[1] } }
