import Hero from './Hero.jsx'

export default {
  title: '2. Composants/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Contenu du seul h1.hero-title de la page' },
    sub: { control: 'text', description: 'Sous-titre hero-sub (optionnel)' }
  }
}

export const AvecSousTitre = { args: { title: 'Le Label Records', sub: 'Label indépendant — Nîmes, France' } }
export const SansSousTitre = { args: { title: 'Sorties' } }
