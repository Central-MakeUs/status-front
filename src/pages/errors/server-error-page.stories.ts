import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-react-router-v6';

import { ServerErrorPage } from '@/pages/errors/server-error-page';

const meta = {
  title: 'pages/errors',
  component: ServerErrorPage,
  parameters: {
    docs: {
      description: {
        story: '500 에러 페이지',
      },
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof ServerErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServerError: Story = {};
