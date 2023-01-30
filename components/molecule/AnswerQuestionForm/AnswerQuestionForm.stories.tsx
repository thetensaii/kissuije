import { Meta, StoryObj } from '@storybook/react';
import { PlayerType } from 'lib/frontend/types/player';
import { QuestionType } from 'lib/frontend/types/question';

import { AnswerQuestionForm } from './AnswerQuestionForm';

const meta: Meta<typeof AnswerQuestionForm> = {
  title: 'Molecule/Forms/AnswerQuestionForm',
  component: AnswerQuestionForm,
};

export default meta;

type Story = StoryObj<typeof AnswerQuestionForm>;
export const Default: Story = {
  args: {
    asker: {
      name: 'Player1',
      character: 'Marylin Monroe',
    } as PlayerType,
    question: {
      text: 'Mon personnage est-il une femme ?',
    } as QuestionType,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
