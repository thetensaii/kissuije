import { Meta, StoryObj } from '@storybook/react';
import { GuessType } from 'lib/frontend/types/guess';
import { PlayerType } from 'lib/frontend/types/player';

import { AnswerGuessForm } from './AnswerGuessForm';

const meta: Meta<typeof AnswerGuessForm> = {
  title: 'Molecule/Forms/AnswerGuessForm',
  component: AnswerGuessForm,
};

export default meta;

type Story = StoryObj<typeof AnswerGuessForm>;
export const Default: Story = {
  args: {
    asker: {
      name: 'Player1',
      character: 'Marylin Monroe',
    } as PlayerType,
    guess: {
      text: 'Sean Paul',
    } as GuessType,
  },
};

export const Disabled: Story = {
  args: {
    asker: {
      name: 'Player1',
      character: 'Marylin Monroe',
    } as PlayerType,
    guess: {
      text: 'Sean Paul',
    } as GuessType,
    disabled: true,
  },
};
