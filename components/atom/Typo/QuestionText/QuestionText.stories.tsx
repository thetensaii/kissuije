import { Meta, StoryObj } from '@storybook/react';
import { QuestionText } from './QuestionText';

const meta: Meta<typeof QuestionText> = {
  title: 'Atom/Typo/QuestionText',
  component: QuestionText,
};

export default meta;

type Story = StoryObj<typeof QuestionText>;

export const Default: Story = {
  args: {
    children: 'Question Text',
  },
};
