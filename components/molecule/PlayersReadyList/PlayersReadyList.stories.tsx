import { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';

import { PlayersReadyList } from './PlayersReadyList';

const meta: Meta<typeof PlayersReadyList> = {
  title: 'Molecule/PlayersReadyList',
  component: PlayersReadyList,
};

export default meta;

type Story = StoryObj<typeof PlayersReadyList>;

const defaultPlayer = {
  name: 'Player',
  avatar: 'AvatarHello',
  isPlayer: false,
} as PlayerType;

export const NoPlayerReady: Story = {
  args: {
    players: [{ ...defaultPlayer, isPlayer: true }, defaultPlayer, defaultPlayer, defaultPlayer],
    checkPlayerReady: (): boolean => false,
  },
};

export const OnePlayerReady: Story = {
  args: {
    players: [{ ...defaultPlayer, isPlayer: true }, defaultPlayer, defaultPlayer, defaultPlayer],
    checkPlayerReady: (p: PlayerType): boolean => p.isPlayer,
  },
};

export const AllPlayersReady: Story = {
  args: {
    players: [defaultPlayer, defaultPlayer, { ...defaultPlayer, isPlayer: true }, defaultPlayer],
    checkPlayerReady: (): boolean => true,
  },
};

export const TooManyPlayers: Story = {
  args: {
    players: [
      defaultPlayer,
      defaultPlayer,
      { ...defaultPlayer, isPlayer: true },
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
      defaultPlayer,
    ],
    checkPlayerReady: (): boolean => true,
  },
};
