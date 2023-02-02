import type { Meta, StoryObj } from '@storybook/react';

import { RuleExplanation } from './RuleExplanation';

const meta: Meta<typeof RuleExplanation> = {
  title: 'Molecule/RuleExplanation',
  component: RuleExplanation,
};

export default meta;

type Story = StoryObj<typeof RuleExplanation>;

export const Default: Story = {
  args: {
    number: 6,
    children: '',
  },
};
