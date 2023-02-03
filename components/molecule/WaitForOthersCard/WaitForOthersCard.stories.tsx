import { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';
import { WaitForOthersCard } from './WaitForOthersCard';

const meta: Meta<typeof WaitForOthersCard> = {
  title: 'Molecule/WaitCard/WaitForOthersCard',
  component: WaitForOthersCard,
};

export default meta;

type Story = StoryObj<typeof WaitForOthersCard>;

const defaultPlayer = {
  name: 'Player',
  avatar: 'AvatarHello',
  isPlayer: false,
} as PlayerType;

export const Default: Story = {
  args: {
    didYouKnowCardText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem porro placeat eos numquam illum ipsam nulla quo quia. Laudantium et quod corrupti odio praesentium ipsa cumque similique aut fugiat saepe.',

    players: [defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer, defaultPlayer],
    checkPlayerReady: (): boolean => false,
  },
};
