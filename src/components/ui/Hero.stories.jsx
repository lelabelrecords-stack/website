import Hero from './Hero.jsx'
import Button from './Button.jsx'

export default {
  title: 'Le Label Records/Composants/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Contenu du seul h1.hero-title de la page' },
    sub: { control: 'text', description: 'Sous-titre hero-sub (optionnel)' },
    actions: { control: false, description: 'CTA du hero (node React, ex. <Button> × 2) — rendu dans .hero-actions' }
  }
}

export const AvecSousTitre = { args: { title: 'Le Label Records', sub: 'Label indépendant — Nîmes, France' } }
export const SansSousTitre = { args: { title: 'Sorties' } }
export const AvecActions = {
  args: { title: 'Le Label Records', sub: 'Label indépendant — Nîmes, France' },
  render: (args) => (
    <Hero
      {...args}
      actions={(
        <>
          <Button to="/sorties">Voir les sorties</Button>
          <Button href="https://lelabelrecords.bandcamp.com/" target="_blank" rel="noopener noreferrer">Écouter le dernier épisode</Button>
        </>
      )}
    />
  )
}
