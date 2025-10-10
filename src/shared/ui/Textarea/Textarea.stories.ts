import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@/shared/ui/Textarea/Textarea';

const meta = {
  title: 'atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  args: {
    label: '성',
    placeholder: '입력하세요.',
  },
};

export const Value: Story = {
  args: {
    label: '성',
    value: '김',
  },
};

export const Error: Story = {
  args: {
    label: '성',
    value: '123',
    errorMessage: '올바르지 않은 값입니다.',
  },
};
