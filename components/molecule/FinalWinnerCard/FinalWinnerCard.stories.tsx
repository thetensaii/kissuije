import { Meta, StoryObj } from '@storybook/react';
import { WinnerType } from 'lib/frontend/types/player';
import { FinalWinnerCard } from './FinalWinnerCard';

const meta: Meta<typeof FinalWinnerCard> = {
  title: 'Molecule/Final/FinalWinnerCard',
  component: FinalWinnerCard,
};

export default meta;

type Story = StoryObj<typeof FinalWinnerCard>;

const defaultWinner = {
  avatar: 'AvatarHello',
  name: 'Maxime',
  character: 'Marilyn Monroe',
} as WinnerType;

export const Default: Story = {
  args: {
    winner: defaultWinner,
  },
};

export const NameOverflow: Story = {
  args: {
    winner: { ...defaultWinner, name: 'HelloIChooseToHaveALongNameJustToTestOverflow' },
  },
};
