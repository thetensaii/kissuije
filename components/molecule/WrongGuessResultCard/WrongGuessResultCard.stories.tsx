import { Meta, StoryObj } from '@storybook/react';
import { GuessType } from 'lib/frontend/types/guess';
import { WrongGuessResultCard } from './WrongGuessResultCard';

const meta: Meta<typeof WrongGuessResultCard> = {
  title: 'Molecule/WrongGuessResultCard',
  component: WrongGuessResultCard,
};

export default meta;

type Story = StoryObj<typeof WrongGuessResultCard>;

export const Default: Story = {
  args: {
    guess: {
      text: 'Marylin Monroe',
      answers: ['yes', 'yes', 'yes', 'no', 'no', 'idk'],
    } as GuessType,
  },
};
