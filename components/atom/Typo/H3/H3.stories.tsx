import { Meta, StoryObj } from '@storybook/react';
import { H3 } from './H3';

const meta: Meta<typeof H3> = {
  title: 'Atom/Typo/H3',
  component: H3,
};

export default meta;

type Story = StoryObj<typeof H3>;

export const Default: Story = {
  args: {
    children: 'H3 Title',
  },
};

export const Regular: Story = {
  args: {
    variant: 'regular',
    children: 'H3 Regular Title',
  },
};

export const Medium: Story = {
  args: {
    variant: 'medium',
    children: 'H3 Medium Title',
  },
};
