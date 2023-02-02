import { Meta, StoryObj } from '@storybook/react';
import { ButtonTypo } from './ButtonTypo';

const meta: Meta<typeof ButtonTypo> = {
  title: 'Atom/Typo/ButtonTypo',
  component: ButtonTypo,
};

export default meta;

type Story = StoryObj<typeof ButtonTypo>;

export const Default: Story = {
  args: {
    children: 'Button Typo',
  },
};
