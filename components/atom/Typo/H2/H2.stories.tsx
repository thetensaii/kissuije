import { Meta, StoryObj } from '@storybook/react';
import { H2 } from './H2';

const meta: Meta<typeof H2> = {
  title: 'Atom/Typo/H2',
  component: H2,
};

export default meta;

type Story = StoryObj<typeof H2>;

export const Default: Story = {
  args: {
    children: 'H2 Title',
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    children: 'H2 Medium Title',
  },
};

export const SemiBold: Story = {
  args: {
    variant: 'semiBold',
    children: 'H2 SemiBold Title',
  },
};
