import { Meta, StoryObj } from '@storybook/react';
import { QuestionType } from 'lib/frontend/types/question';
import { QuestionResultCard } from './QuestionResultCard';

const meta: Meta<typeof QuestionResultCard> = {
  title: 'Molecule/AttemptResult/QuestionResultCard',
  component: QuestionResultCard,
};

export default meta;

type Story = StoryObj<typeof QuestionResultCard>;

export const Default: Story = {
  args: {
    question: {
      text: 'Mon personnage est-il une femme ?',
      answers: ['yes', 'no', 'idk'],
    } as QuestionType,
  },
};
export const Random: Story = {
  args: {
    question: {
      text: 'Mon personnage est-il une femme ?',
      answers: ['yes', 'yes', 'yes', 'no', 'no', 'idk'],
    } as QuestionType,
  },
};

export const Oui: Story = {
  args: {
    question: {
      text: 'Mon personnage est-il une femme ?',
      answers: ['yes'],
    } as QuestionType,
  },
};

export const Non: Story = {
  args: {
    question: {
      text: 'Mon personnage est-il une femme ?',
      answers: ['no'],
    } as QuestionType,
  },
};

export const JeNeSaisPas: Story = {
  args: {
    question: {
      text: 'Mon personnage est-il une femme ?',
      answers: ['idk'],
    } as QuestionType,
  },
};
