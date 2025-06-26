import type { Preview } from '@storybook/react-vite';
import { themes } from 'storybook/theming';
import '@/scss/global.scss';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
