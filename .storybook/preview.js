import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import '../src/styles/main.scss'

export const parameters = {
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  a11y: { disable: false },
  options: {
    storySort: {
      order: [
        'Le Label Records',
        ['Welcome', 'Fondations', 'Composants', 'Patterns']
      ]
    }
  }
}

export const decorators = [(Story) => createElement(MemoryRouter, null, createElement(Story))]
