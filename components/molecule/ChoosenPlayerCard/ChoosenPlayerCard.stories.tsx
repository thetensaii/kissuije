import type { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';

import { ChoosenPlayerCard } from './ChoosenPlayerCard';

const meta: Meta<typeof ChoosenPlayerCard> = {
  title: 'Molecule/ChoosenPlayerCard',
  component: ChoosenPlayerCard,
};

export default meta;

type Story = StoryObj<typeof ChoosenPlayerCard>;

const player = {
  avatar: 'AvatarLora',
  name: 'Player1',
} as PlayerType;

export const Default: Story = {
  args: {
    player: player,
  },
};
