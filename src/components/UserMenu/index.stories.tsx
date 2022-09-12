import React from 'react';

import { Meta, Story } from '@storybook/react';

import { User } from 'types/user';

import UserMenu, { UserMenuProps } from '.';

const user: User = {
  email: 'dev@nimblehq.co',
  name: 'Developer',
  avatarUrl: 'https://avatars.dicebear.com/v2/female/56762df0114df9fa952b5ba46f97e651.svg',
};

export default {
  component: UserMenu,
  args: {
    user: user,
  },
} as Meta;

const Template = (args: UserMenuProps) => <UserMenu {...args} />;

export const Default: Story<UserMenuProps> = Template.bind({});
Default.storyName = UserMenu.name;
