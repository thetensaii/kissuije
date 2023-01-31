import { Meta, StoryObj } from '@storybook/react';
import { WinnerType } from 'lib/frontend/types/player';
import { FinalWinnersGrid } from './FinalWinnersGrid';

const meta: Meta<typeof FinalWinnersGrid> = {
  title: 'Molecule/FinalWinnersGrid',
  component: FinalWinnersGrid,
};

export default meta;

type Story = StoryObj<typeof FinalWinnersGrid>;

const defaultWinner = {
  avatar: 'AvatarHello',
  name: 'Maxime',
  character: 'Marilyn Monroe',
} as WinnerType;

export const OneWinner: Story = {
  args: {
    winners: [defaultWinner],
  },
};

export const TwoWinners: Story = {
  args: {
    winners: [defaultWinner, defaultWinner],
  },
};

export const ThreeWinners: Story = {
  args: {
    winners: [defaultWinner, defaultWinner, defaultWinner],
  },
};

export const FourWinners: Story = {
  args: {
    winners: [
      defaultWinner,
      { ...defaultWinner, name: 'EGEWRBFREFWGA gegrefrqsrga gsdafgesbr' },
      defaultWinner,
      defaultWinner,
    ],
  },
};
