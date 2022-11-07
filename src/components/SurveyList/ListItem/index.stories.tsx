import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Survey } from 'types/survey';

import ListItem, { ListItemProps } from '.';

const survey: Survey = {
  id: 'd5de6a8f8f5f1cfe51bc',
  title: 'Scarlett Bangkok',
  description: "We'd love ot hear from you!",
  coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
  coverImageUrlLarge: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l',
  createdAt: '2017-01-23T07:48:12.991Z',
};

export default {
  component: ListItem,
  argTypes: { onSelected: { action: 'clicked' } },
} as Meta;

const Template = (args: ListItemProps) => <ListItem {...args} />;

export const Default: Story<ListItemProps> = Template.bind({});
Default.storyName = ListItem.name;
Default.args = { survey };
