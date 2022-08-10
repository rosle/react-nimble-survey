import React from 'react';

import { Meta, Story } from '@storybook/react';

import AuthLayout, { AuthLayoutProps } from './';

export default {
  title: 'Layouts',
  component: AuthLayout,
} as Meta;

const Template = (args: AuthLayoutProps) => (
  <AuthLayout {...args}>
    <p>This is the page content</p>
  </AuthLayout>
);

export const Auth: Story<AuthLayoutProps> = Template.bind({});

Auth.args = { headerTitle: 'Sign in to Nimble' };
