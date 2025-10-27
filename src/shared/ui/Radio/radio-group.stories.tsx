import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '@/shared/ui/radio/radio-group';
import { Radio } from '@/shared/ui/radio/radio';

const meta = {
  title: 'atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [plan, setPlan] = useState('free');

    return (
      <RadioGroup>
        <Radio
          label="Free"
          checked={plan === 'free'}
          onClick={() => setPlan('free')}
        />
        <Radio
          label="Pro"
          checked={plan === 'pro'}
          onClick={() => setPlan('pro')}
        />
        <Radio
          label="Enterprise (준비 중)"
          checked={plan === 'enterprise'}
          disabled={true}
        />
      </RadioGroup>
    );
  },
};
