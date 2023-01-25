import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    buttonType: {
      options: ['primary', 'secondary', 'ternary'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ternary: Story = {
  args: {
    buttonType: 'ternary',
    children: 'Ternary Button',
  },
};
