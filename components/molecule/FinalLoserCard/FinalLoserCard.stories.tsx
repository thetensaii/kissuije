import { Meta, StoryObj } from '@storybook/react';
import { LoserType } from 'lib/frontend/types/player';
import { FinalLoserCard } from './FinalLoserCard';

const meta: Meta<typeof FinalLoserCard> = {
  title: 'Molecule/FinalLoserCard',
  component: FinalLoserCard,
};

export default meta;

type Story = StoryObj<typeof FinalLoserCard>;

export const Default: Story = {
  args: {
    loser: {
      name: 'Maxime',
      character: 'Marilyn Monroe',
      avatar: 'AvatarEmile',
    } as LoserType,
  },
};
