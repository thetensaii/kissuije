import { Meta, StoryObj } from '@storybook/react';
import { LoserType } from 'lib/frontend/types/player';
import { FinalLosersGrid } from './FinalLosersGrid';

const meta: Meta<typeof FinalLosersGrid> = {
  title: 'Molecule/Final/FinalLosersGrid',
  component: FinalLosersGrid,
};

export default meta;

type Story = StoryObj<typeof FinalLosersGrid>;

const defaultLoser = {
  avatar: 'AvatarHello',
  name: 'Maxime',
  character: 'Marilyn Monroe',
} as LoserType;

export const Default: Story = {
  args: {
    losers: [defaultLoser, defaultLoser],
  },
};

export const Default2: Story = {
  args: {
    losers: [
      defaultLoser,
      defaultLoser,
      defaultLoser,
      { ...defaultLoser, name: 'ndvdsvjs bksd  dsjz' },
      defaultLoser,
      defaultLoser,
      defaultLoser,
      defaultLoser,
    ],
  },
};
