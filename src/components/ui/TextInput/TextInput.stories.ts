import { TextInput } from '@/components/ui/TextInput/TextInput';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'atoms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextInput>;

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
