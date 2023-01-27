import type { Meta, StoryObj } from '@storybook/react';

import { RulesExplanation } from './RulesExplanation';

const meta: Meta<typeof RulesExplanation> = {
  title: 'Molecule/RulesExplanation',
  component: RulesExplanation,
};

export default meta;

type Story = StoryObj<typeof RulesExplanation>;

export const Default: Story = {
  render: () => <RulesExplanation />,
};
