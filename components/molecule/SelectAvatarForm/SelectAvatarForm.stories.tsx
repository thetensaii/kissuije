import type { Meta, StoryObj } from '@storybook/react';

import { SelectAvatarForm } from './SelectAvatarForm';

const meta: Meta<typeof SelectAvatarForm> = {
  title: 'Molecule/Forms/SelectAvatarForm',
  component: SelectAvatarForm,
};

export default meta;

type Story = StoryObj<typeof SelectAvatarForm>;

export const Default: Story = {
  render: () => <SelectAvatarForm onChange={(): void => undefined} />,
};
