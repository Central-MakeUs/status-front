import type { Meta, StoryObj } from '@storybook/react-vite';

import { Loading } from './Loading';

const meta = {
  title: 'molecule/loading',
  component: Loading,
  parameters: {
    docs: {
      description: {
        story: '페이지 전환 시 로딩 표시',
      },
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageLoading: Story = {};
