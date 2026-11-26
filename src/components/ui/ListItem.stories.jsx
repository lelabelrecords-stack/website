import ListItem from './ListItem.jsx'

export default {
  title: 'Le Label Records/Composants/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Grille, ex. col-50 col-100-sp' },
    children: { control: 'text' }
  }
}

export const Defaut = {
  render: () => (
    <ul>
      <ListItem>Premier élément (aucun filet : le padding seul sépare)</ListItem>
      <ListItem>Deuxième élément</ListItem>
    </ul>
  )
}
