import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '@/shared/ui/radio/radio';

const meta = {
  title: 'atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '기본 라디오',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: '선택된 라디오',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 라디오',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: '비활성화 + 선택된 라디오',
    checked: true,
    disabled: true,
  },
};
