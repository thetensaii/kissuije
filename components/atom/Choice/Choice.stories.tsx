import { Meta, StoryObj } from '@storybook/react';

import { Choice } from './Choice';

const meta: Meta<typeof Choice> = {
  title: 'Atom/Choice',
  component: Choice,
};

export default meta;

type Story = StoryObj<typeof Choice>;

export const Oui: Story = {
  args: {
    type: 'yes',
    children: 'Oui',
  },
};

export const Non: Story = {
  args: {
    type: 'no',
    children: 'Non',
  },
};

export const JeNeSaisPas: Story = {
  args: {
    type: 'idk',
    children: 'Je ne sais pas',
  },
};

export const Vrai: Story = {
  args: {
    type: 'true',
    children: 'Vrai',
  },
};

export const Faux: Story = {
  args: {
    type: 'false',
    children: 'Faux',
  },
};
