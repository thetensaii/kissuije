import type { Meta, StoryObj } from '@storybook/react';

import { SelectAvatar } from './SelectAvatar';

const meta: Meta<typeof SelectAvatar> = {
  title: 'Molecule/SelectAvatar',
  component: SelectAvatar,
};

export default meta;

type Story = StoryObj<typeof SelectAvatar>;

export const Default: Story = {
  render: () => <SelectAvatar onChange={(): void => undefined} />,
};
