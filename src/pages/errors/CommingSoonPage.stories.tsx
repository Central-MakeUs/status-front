import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ComingSoonPage } from './ComingSoonPage';

const meta = {
  title: 'pages/errors',
  component: ComingSoonPage,
  parameters: {
    docs: {
      autodocs: true,
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof ComingSoonPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComingSoon: Story = {};
