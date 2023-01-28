import type { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';
import { AvatarType } from 'lib/frontend/types/svg';

import { LobbyPlayer } from './LobbyPlayer';

const meta: Meta<typeof LobbyPlayer> = {
  title: 'Molecule/LobbyPlayer',
  component: LobbyPlayer,
};

export default meta;

type Story = StoryObj<typeof LobbyPlayer>;

const player = {
  name: 'Player',
  avatar: AvatarType.AvatarHello,
  isOwner: false,
  isPlayer: false,
} as PlayerType;

export const Default: Story = {
  args: {
    player: {
      ...player,
      name: 'Default',
    },
  },
};

export const Owner: Story = {
  args: {
    player: {
      ...player,
      name: 'Owner',
      isOwner: true,
    },
  },
};

export const Me: Story = {
  args: {
    player: {
      ...player,
      name: 'Me',
      isPlayer: true,
    },
  },
};

export const MeOwner: Story = {
  args: {
    player: {
      ...player,
      name: 'MeOwner',
      isPlayer: true,
      isOwner: true,
    },
  },
};
