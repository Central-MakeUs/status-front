import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from '@/components/ui/Switch/Switch';

const meta = {
  title: 'atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예시들
export const Unchecked: Story = {
  args: {
    label: 'option A',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'option B',
    checked: true,
  },
};
