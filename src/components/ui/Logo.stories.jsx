import { useEffect } from 'react'
import Logo from './Logo.jsx'
import logoRougeUrl from '../../../public/assets/logo-contour-rouge.svg?url'
import logoBlancUrl from '../../../public/assets/logo-contour-rouge-blanc.svg?url'

export default {
  title: 'Le Label Records/Composants/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Taille (ex. header-logo) ou variante .logo-svg--on-accent (blanc sur fond accent)' },
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

export const SurFondAccent = {
  render: () => (
    <div style={{ maxWidth: 160, backgroundColor: 'var(--accent)', padding: '1rem' }}>
      <Logo className="logo-svg--on-accent" label="Le Label Records — blanc sur fond accent" />
    </div>
  )
}

export const Telechargement = {
  render: () => (
    <ul>
      <li><a href={logoRougeUrl} download="logo-contour-rouge.svg">logo-contour-rouge.svg</a> — contour, stroke currentColor (se recolore en CSS)</li>
      <li><a href={logoBlancUrl} download="logo-contour-rouge-blanc.svg">logo-contour-rouge-blanc.svg</a> — blanc #fff, pour fond plein accent</li>
    </ul>
  )
}
