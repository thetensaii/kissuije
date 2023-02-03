import { Meta, StoryObj } from '@storybook/react';
import { ResultStatBar } from './ResultStatBar';

const meta: Meta<typeof ResultStatBar> = {
  title: 'Molecule/AttemptResult/ResultStatBar',
  component: ResultStatBar,
};

export default meta;

type Story = StoryObj<typeof ResultStatBar>;

export const Default: Story = {
  args: {
    stats: {
      yes: 1,
      no: 1,
      idk: 1,
    },
    countTotalAnswers: 3,
  },
};
export const Random: Story = {
  args: {
    stats: {
      yes: 3,
      no: 2,
      idk: 1,
    },
    countTotalAnswers: 6,
  },
};

export const Oui: Story = {
  args: {
    stats: {
      yes: 1,
      no: 0,
      idk: 0,
    },
    countTotalAnswers: 1,
  },
};

export const Non: Story = {
  args: {
    stats: {
      yes: 0,
      no: 1,
      idk: 0,
    },
    countTotalAnswers: 1,
  },
};

export const JeNeSaisPas: Story = {
  args: {
    stats: {
      yes: 0,
      no: 0,
      idk: 1,
    },
    countTotalAnswers: 1,
  },
};
