import Cover from './Cover.jsx'

export default {
  title: 'Le Label Records/Composants/Cover',
  component: Cover,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Pastille centrée = nom de l\'artiste (le type EP/Single/LP est en métadonnée « type · date »)' },
    href: { control: 'text', description: 'Rend la carte cliquable (rempli au survol)' },
    ariaLabel: { control: 'text', description: 'Obligatoire si href' }
  }
}

export const AvecLien = {
  args: { label: 'Montevideo', href: 'https://lelabelrecords.bandcamp.com/', ariaLabel: 'Vision / Montevideo — écouter' },
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <Cover {...args} />
      <p className="____row release-title"><strong>Vision</strong> / Montevideo</p>
      <p className="____row textsize-small">EP · 16 octobre 2026</p>
    </div>
  )
}
export const SansLien = {
  args: { label: 'KØRROBOR' },
  render: (args) => (
    <div style={{ maxWidth: 240 }}>
      <Cover {...args} />
      <p className="____row release-title"><strong>EP1</strong> / KØRROBOR</p>
      <p className="____row textsize-small">EP · 18 décembre 2026</p>
    </div>
  )
}
