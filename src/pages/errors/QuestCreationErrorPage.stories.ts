import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-react-router-v6';

import { QuestCreationErrorPage } from '@/pages/errors/QuestCreationErrorPage';

const meta = {
  title: 'pages/errors',
  component: QuestCreationErrorPage,
  parameters: {
    docs: {
      description: {
        story: '퀘스트 생성 실패 페이지',
      },
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof QuestCreationErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuestCreationError: Story = {};
