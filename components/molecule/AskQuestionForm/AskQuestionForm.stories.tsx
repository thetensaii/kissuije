import { Meta, StoryObj } from '@storybook/react';
import { AskQuestionForm } from './AskQuestionForm';

const meta: Meta<typeof AskQuestionForm> = {
  title: 'Molecule/Forms/AskQuestionForm',
  component: AskQuestionForm,
};

export default meta;

type Story = StoryObj<typeof AskQuestionForm>;

export const Default: Story = {};
