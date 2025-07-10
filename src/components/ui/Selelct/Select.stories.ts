import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from '@/components/ui/Selelct/Select';

const meta = {
  title: 'atom/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '반복 주기',
    value: 'daily',
    options: [
      { value: 'daily', label: '매일' },
      { value: 'weekly', label: '매주' },
      { value: 'monthly', label: '매월' },
    ],
    onChange: () => {},
  },
};
