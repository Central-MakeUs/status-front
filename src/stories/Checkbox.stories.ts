import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';

const meta = {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예시들
export const Unchecked: Story = {
  args: {
    label: '체크되지 않음',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: '체크됨',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화 + 체크',
    checked: true,
    disabled: true,
  },
};
