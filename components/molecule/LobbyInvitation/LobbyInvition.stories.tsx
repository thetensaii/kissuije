import type { Meta, StoryObj } from '@storybook/react';

import { LobbyInvitation } from './LobbyInvitation';

const meta: Meta<typeof LobbyInvitation> = {
  title: 'Molecule/LobbyInvitation',
  component: LobbyInvitation,
};

export default meta;

type Story = StoryObj<typeof LobbyInvitation>;

export const Default: Story = {
  args: {
    invitationLink: 'https://exemple.com',
  },
};
