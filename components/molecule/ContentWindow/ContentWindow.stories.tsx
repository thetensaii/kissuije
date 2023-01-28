import type { Meta, StoryObj } from '@storybook/react';

import { ContentWindow } from './ContentWindow';

const meta: Meta<typeof ContentWindow> = {
  title: 'Molecule/ContentWindow',
  component: ContentWindow,
};

export default meta;

type Story = StoryObj<typeof ContentWindow>;

export const Default: Story = {
  render: () => (
    <ContentWindow>
      <h1>Content</h1>
    </ContentWindow>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <ContentWindow onBackButtonClick={(): void => undefined}>
      <h1>Content</h1>
    </ContentWindow>
  ),
};
