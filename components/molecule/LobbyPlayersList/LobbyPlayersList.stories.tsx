import type { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';
import { AvatarType } from 'lib/frontend/types/svg';

import { LobbyPlayersList } from './LobbyPlayersList';

const meta: Meta<typeof LobbyPlayersList> = {
  title: 'Molecule/Lobby/LobbyPlayersList',
  component: LobbyPlayersList,
};

export default meta;

type Story = StoryObj<typeof LobbyPlayersList>;

const player = {
  name: 'Player',
  avatar: AvatarType.AvatarHello,
  isOwner: false,
  isPlayer: false,
} as PlayerType;

export const OnePlayer: Story = {
  args: {
    players: [
      {
        ...player,
        name: 'MyNameIsTooLong',
        isOwner: true,
        isPlayer: true,
      },
    ],
  },
};

export const MultiplePlayers: Story = {
  args: {
    players: [
      {
        ...player,
        name: 'MyNameIsTooLong',
        isOwner: true,
        isPlayer: true,
      },
      {
        ...player,
        name: 'Player 2',
      },
      {
        ...player,
        name: 'Player 3',
      },
      {
        ...player,
        name: 'Player 3',
      },
      {
        ...player,
        name: 'Player 3',
      },
      {
        ...player,
        name: 'Player 3',
      },
      {
        ...player,
        name: 'Player 3',
      },
    ],
  },
};
