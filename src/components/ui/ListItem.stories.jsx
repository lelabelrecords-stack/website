import ListItem from './ListItem.jsx'

export default {
  title: '2. Composants/ListItem',
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
      <ListItem>Premier élément (filet 1px)</ListItem>
      <ListItem>Deuxième élément</ListItem>
    </ul>
  )
}
