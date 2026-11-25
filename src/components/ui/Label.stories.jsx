import Label from './Label.jsx'

export default {
  title: 'Le Label Records/Composants/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    filled: { control: 'boolean', description: 'Version pleine (fond accent)' },
    children: { control: 'text', description: 'Catégorie — rendue précédée d\'un #' }
  }
}

export const Contour = { args: { children: 'concert' } }
export const Plein = { args: { filled: true, children: 'release' } }
