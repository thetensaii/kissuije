import { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';
import { LoserCard } from './LoserCard';

const meta: Meta<typeof LoserCard> = {
  title: 'Molecule/AttemptResult/LoserCard',
  component: LoserCard,
};

export default meta;

type Story = StoryObj<typeof LoserCard>;

export const Default: Story = {
  args: {
    player: {
      character: 'Marylin Monroe',
    } as PlayerType,
  },
};
