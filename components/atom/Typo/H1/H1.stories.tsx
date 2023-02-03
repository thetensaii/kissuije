import { Meta, StoryObj } from '@storybook/react';
import { H1 } from './H1';

const meta: Meta<typeof H1> = {
  title: 'Atom/Typo/H1',
  component: H1,
};

export default meta;

type Story = StoryObj<typeof H1>;

export const Default: Story = {
  args: {
    children: 'H1 Title',
  },
};
