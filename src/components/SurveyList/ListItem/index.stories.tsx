import React from 'react';

import { Meta, Story } from '@storybook/react';

import { buildSurvey } from 'tests/factories/survey';

import ListItem, { ListItemProps } from '.';

const survey = buildSurvey();

export default {
  component: ListItem,
} as Meta;

const Template = (args: ListItemProps) => <ListItem {...args} />;

export const Default: Story<ListItemProps> = Template.bind({});
Default.storyName = ListItem.name;
Default.args = { survey };
