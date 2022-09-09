import React from 'react';

import { Meta, Story } from '@storybook/react';

import { User } from 'types/user';

import UserMenu, { UserMenuProps } from '.';

export default {
  component: UserMenu,
} as Meta;

const user: User = {
  email: 'dev@nimblehq.co',
  name: 'Developer',
  avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
};

// TODO: Configure Args
const Template = () => <UserMenu user={user} />;

export const Default: Story<UserMenuProps> = Template.bind({});
Default.storyName = UserMenu.name;
