import React from 'react';

import { Meta, Story } from '@storybook/react';

import LoadingListItem, { LoadingListItemProps } from '.';

export default {
  component: LoadingListItem,
} as Meta;

const Template = (args: LoadingListItemProps) => <LoadingListItem {...args} />;

export const Default: Story<LoadingListItemProps> = Template.bind({});
Default.storyName = LoadingListItem.name;
