import { Meta, StoryObj } from '@storybook/react';
import { WaitForOthersCard } from './WaitForOthersCard';

const meta: Meta<typeof WaitForOthersCard> = {
  title: 'Molecule/WaitCard/WaitForOthersCard',
  component: WaitForOthersCard,
};

export default meta;

type Story = StoryObj<typeof WaitForOthersCard>;

export const Default: Story = {
  args: {
    didYouKnowCardText:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem porro placeat eos numquam illum ipsam nulla quo quia. Laudantium et quod corrupti odio praesentium ipsa cumque similique aut fugiat saepe.',
  },
};
