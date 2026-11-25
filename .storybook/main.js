export default {
  stories: ['../src/**/*.stories.@(jsx|mdx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../storybook-public'],
  docs: { autodocs: true }
}
