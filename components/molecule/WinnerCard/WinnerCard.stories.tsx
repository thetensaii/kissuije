import { Meta, StoryObj } from '@storybook/react';
import { AttemptType } from 'lib/frontend/types/attempt';
import { PlayerType } from 'lib/frontend/types/player';
import { WinnerCard } from './WinnerCard';

const meta: Meta<typeof WinnerCard> = {
  title: 'Molecule/AttemptResult/WinnerCard',
  component: WinnerCard,
};

export default meta;

type Story = StoryObj<typeof WinnerCard>;

export const Default: Story = {
  args: {
    player: {
      character: 'Marylin Monroe',
    } as PlayerType,
    attempt: {
      answers: ['yes', 'yes', 'yes', 'no'],
    } as AttemptType,
  },
};
