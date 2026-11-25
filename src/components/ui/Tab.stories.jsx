import { useState } from 'react'
import { within, userEvent, expect } from 'storybook/test'
import Tab from './Tab.jsx'

export default {
  title: 'Le Label Records/Composants/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean', description: 'aria-selected + tabIndex 0' },
    controls: { control: 'text', description: 'id du tabpanel (aria-controls)' },
    onClick: { action: 'select', description: 'Sélection — flèches ←→↑↓ aussi actives (roving tabindex)' }
  }
}

const GroupeDemo = () => {
  const [t, setT] = useState('actus')
  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Catégories">
        <Tab selected={t === 'actus'} controls="tab-panel" onClick={() => setT('actus')}>Actus</Tab>
        <Tab selected={t === 'events'} controls="tab-panel" onClick={() => setT('events')}>Événements</Tab>
        <Tab selected={t === 'toutes'} controls="tab-panel" onClick={() => setT('toutes')}>Toutes</Tab>
      </div>
      <p className="__row textsize-small" id="tab-panel" role="tabpanel">Onglet actif : <strong>{t}</strong></p>
    </div>
  )
}

export const Groupe = {
  render: () => <GroupeDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const eventsTab = canvas.getByRole('tab', { name: 'Événements' })
    await userEvent.click(eventsTab)
    await expect(eventsTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('events')
  }
}
