import type { Meta, StoryObj } from '@storybook/react';
import { AvatarType } from 'lib/frontend/types/svg';

import { Player } from './Player';

const meta: Meta<typeof Player> = {
  title: 'Molecule/Player',
  component: Player,
};

export default meta;

type Story = StoryObj<typeof Player>;

export const Default: Story = {
  args: {
    name: 'Default',
    avatar: AvatarType.AvatarHello,
  },
};

export const Owner: Story = {
  args: {
    name: 'Owner',
    avatar: AvatarType.AvatarHello,
    isOwner: true,
  },
};

export const Me: Story = {
  args: {
    name: 'Me',
    avatar: AvatarType.AvatarHello,
    isPlayer: true,
  },
};

export const MeOwner: Story = {
  args: {
    name: 'MeOwner',
    avatar: AvatarType.AvatarHello,
    isPlayer: true,
    isOwner: true,
  },
};
