import type { Meta, StoryObj } from '@storybook/react';
import { AvatarList, AvatarType } from 'lib/frontend/types/avatar';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    type: {
      options: AvatarList,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    type: AvatarType.Emile,
  },
};
