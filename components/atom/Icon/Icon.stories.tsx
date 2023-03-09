import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { avatarsList } from './types';

const meta: Meta<typeof Icon> = {
  title: 'Atom/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    variant: 'Checked',
    width: 80,
    height: 80,
  },
};

export const Avatar: Story = {
  argTypes: {
    variant: {
      options: avatarsList,
      control: {
        type: 'select',
      },
    },
  },
  args: {
    variant: 'AvatarKevin',
    width: 80,
    height: 80,
  },
};
