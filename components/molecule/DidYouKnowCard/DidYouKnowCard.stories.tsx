import type { Meta, StoryObj } from '@storybook/react';

import { DidYouKnowCard } from './DidYouKnowCard';

const meta: Meta<typeof DidYouKnowCard> = {
  title: 'Molecule/DidYouKnowCard',
  component: DidYouKnowCard,
};

export default meta;

type Story = StoryObj<typeof DidYouKnowCard>;

export const Default: Story = {
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi qui obcaecati, dolorum architecto sapiente iure ullam laborum rerum dolores a quos aut dolore optio animi quo neque corrupti! Laborum, quasi!',
  },
};
