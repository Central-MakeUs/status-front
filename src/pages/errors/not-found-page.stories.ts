import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-react-router-v6';

import { NotFoundPage } from '@/pages/errors/not-found-page';

const meta = {
  title: 'pages/errors',
  component: NotFoundPage,
  parameters: {
    docs: {
      description: {
        story: '404 에러 페이지',
      },
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {};
