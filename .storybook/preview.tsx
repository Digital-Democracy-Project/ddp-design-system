import type { Preview } from '@storybook/react-vite';
import '../styles/colors_and_type.css';

// Renders every story inside a themed wrapper so the toolbar toggle below
// actually exercises our [data-theme="dark"] token remapping, not just the
// default light theme.
const withTheme: Preview['decorators'] = [
  (Story, context) => (
    <div data-theme={context.globals.theme ?? 'light'} style={{ padding: '1rem' }}>
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: withTheme,
};

export default preview;
