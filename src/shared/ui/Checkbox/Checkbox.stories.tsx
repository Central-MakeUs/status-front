import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@/shared/ui/checkbox/checkbox';

const meta = {
  title: 'atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예시들
export const Unchecked: Story = {
  render() {
    return (
      <Checkbox checked={false}>
        <Checkbox.Label>체크되지 않음</Checkbox.Label>
      </Checkbox>
    );
  },
};

export const Checked: Story = {
  render() {
    return (
      <Checkbox checked={true}>
        <Checkbox.Label>체크됨</Checkbox.Label>
      </Checkbox>
    );
  },
};

export const Disabled: Story = {
  render() {
    return (
      <Checkbox checked={false} disabled={true}>
        <Checkbox.Label>비활성화</Checkbox.Label>
      </Checkbox>
    );
  },
};

export const DisabledChecked: Story = {
  render() {
    return (
      <Checkbox checked={true} disabled={true}>
        <Checkbox.Label>비활성화 + 체크</Checkbox.Label>
      </Checkbox>
    );
  },
};
