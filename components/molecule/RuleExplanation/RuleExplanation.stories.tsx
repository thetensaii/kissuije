import type { Meta, StoryObj } from '@storybook/react';

import { RuleExplanation } from './RuleExplanation';

const meta: Meta<typeof RuleExplanation> = {
  title: 'Atom/RuleExplanation',
  component: RuleExplanation,
};

export default meta;

type Story = StoryObj<typeof RuleExplanation>;

export const Default: Story = {
  render: () => (
    <RuleExplanation number={5}>
      <p>Content</p>
    </RuleExplanation>
  ),
};
