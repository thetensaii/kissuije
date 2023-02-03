import { Meta, StoryObj } from '@storybook/react';

import { InputButton } from './InputButton';

const meta: Meta<typeof InputButton> = {
  title: 'Atom/InputButton',
  component: InputButton,
};

export default meta;

type Story = StoryObj<typeof InputButton>;

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
