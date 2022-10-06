import React from 'react';

import { Meta, Story } from '@storybook/react';

import BackgroundImage, { BackgroundImageProps } from '.';

export default {
  component: BackgroundImage,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 400 },
  },
} as Meta;

const Template = (args: BackgroundImageProps) => <BackgroundImage {...args} />;

export const Default: Story<BackgroundImageProps> = Template.bind({});
Default.storyName = BackgroundImage.name;
Default.args = {
  imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_',
};
