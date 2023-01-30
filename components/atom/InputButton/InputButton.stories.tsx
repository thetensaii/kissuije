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
    value: 'Oui',
  },
};

export const Non: Story = {
  args: {
    value: 'Non',
  },
};

export const JeNeSaisPas: Story = {
  args: {
    value: 'Je ne sais pas',
  },
};

export const Vrai: Story = {
  args: {
    value: 'Vrai',
  },
};

export const Faux: Story = {
  args: {
    value: 'Faux',
  },
};
