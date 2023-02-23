import { Meta, StoryObj } from '@storybook/react';
import { ButtonText } from './ButtonText';

const meta: Meta<typeof ButtonText> = {
  title: 'Atom/Typo/ButtonText',
  component: ButtonText,
};

export default meta;

type Story = StoryObj<typeof ButtonText>;

export const Default: Story = {
  args: {
    children: 'Button Text',
  },
};
