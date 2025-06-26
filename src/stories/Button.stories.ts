import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/ui/Button/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    varient: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    varient: 'secondary',
    children: 'Button',
  },
};

export const Tertiary: Story = {
  args: {
    varient: 'tertiary',
    children: 'Button',
  },
};
