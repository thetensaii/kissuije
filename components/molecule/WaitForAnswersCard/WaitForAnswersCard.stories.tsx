import { Meta, StoryObj } from '@storybook/react';
import { WaitForAnswersCard } from './WaitForAnswersCard';

const meta: Meta<typeof WaitForAnswersCard> = {
  title: 'Molecule/WaitCard/WaitForAnswersCard',
  component: WaitForAnswersCard,
};

export default meta;

type Story = StoryObj<typeof WaitForAnswersCard>;

export const Default: Story = {};
