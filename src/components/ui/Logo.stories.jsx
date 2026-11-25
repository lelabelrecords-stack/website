import { useEffect } from 'react'
import Logo from './Logo.jsx'

export default {
  title: 'Le Label Records/Composants/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Taille (ex. header-logo)' },
    label: { control: 'text', description: 'aria-label (role="img")' }
  }
}

export const Defaut = {
  args: { label: 'Le Label Records' },
  render: (args) => <div style={{ maxWidth: 160 }}><Logo {...args} /></div>
}

export const ThemeMono = {
  render: () => {
    useEffect(() => {
      document.documentElement.dataset.theme = 'mono'
      return () => { delete document.documentElement.dataset.theme }
    }, [])
    return <div style={{ maxWidth: 160 }}><Logo label="Le Label Records — thème #343434" /></div>
  }
}
