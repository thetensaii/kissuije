import type { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';

import { ChoosePlayerCharacterForm } from './ChoosePlayerCharacterForm';

const meta: Meta<typeof ChoosePlayerCharacterForm> = {
  title: 'Molecule/Forms/ChoosePlayerCharacterForm',
  component: ChoosePlayerCharacterForm,
};

export default meta;

type Story = StoryObj<typeof ChoosePlayerCharacterForm>;

const player = {
  avatar: 'AvatarLora',
  name: 'Player1',
} as PlayerType;

export const Default: Story = {
  args: {
    playerChoosed: player,
  },
};
