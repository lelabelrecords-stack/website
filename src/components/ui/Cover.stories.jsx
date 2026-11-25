import Cover from './Cover.jsx'

export default {
  title: '2. Composants/Cover',
  component: Cover,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Pastille centrée (type de sortie)' },
    href: { control: 'text', description: 'Rend la carte cliquable (rempli au survol)' },
    ariaLabel: { control: 'text', description: 'Obligatoire si href' }
  }
}

export const AvecLien = {
  args: { label: 'EP', href: 'https://lelabelrecords.bandcamp.com/', ariaLabel: 'Vision — écouter' },
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <Cover {...args} />
      <p className="____row textsize-small"><strong>Vision</strong> / Montevideo</p>
    </div>
  )
}
export const SansLien = {
  args: { label: 'Single' },
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <Cover {...args} />
      <p className="____row textsize-small"><strong>Brawn</strong> / Montevideo</p>
    </div>
  )
}
