import React from 'react';

import { Meta, Story } from '@storybook/react';

import DefaultLayout, { DefaultLayoutProps } from './';

export default {
  component: DefaultLayout,
} as Meta;

const Template = (args: DefaultLayoutProps) => (
  <DefaultLayout {...args}>
    <p>This is the page content</p>
  </DefaultLayout>
);

export const Default: Story<DefaultLayoutProps> = Template.bind({});
