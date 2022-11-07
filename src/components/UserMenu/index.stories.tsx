import React from 'react';

import { Meta, Story } from '@storybook/react';

import { buildUser } from 'tests/factories/user';

import UserMenu, { UserMenuProps } from '.';

export default {
  component: UserMenu,
  args: {
    user: buildUser(),
  },
} as Meta;

const Template = (args: UserMenuProps) => <UserMenu {...args} />;

export const Default: Story<UserMenuProps> = Template.bind({});
Default.storyName = UserMenu.name;
