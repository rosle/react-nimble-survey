import React from 'react';

import { Meta, Story } from '@storybook/react';

import FullScreenLayout, { FullScreenLayoutProps } from '.';

export default {
  component: FullScreenLayout,
} as Meta;

const Template = (args: FullScreenLayoutProps) => (
  <FullScreenLayout {...args}>
    <p>This is the page content</p>
  </FullScreenLayout>
);

export const FullScreen: Story<FullScreenLayoutProps> = Template.bind({});
FullScreen.args = {
  topNavigation: <a href="/">Back</a>,
};
