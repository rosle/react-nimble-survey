import React from 'react';

import { Meta, Story } from '@storybook/react';

import DefaultLayout, { DefaultLayoutProps } from './';

export default {
  title: 'Layouts',
  component: DefaultLayout,
} as Meta;

const Template = (args: DefaultLayoutProps) => <DefaultLayout {...args} />;

export const Default: Story<DefaultLayoutProps> = Template.bind({});
