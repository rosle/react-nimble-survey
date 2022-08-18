import React from 'react';

import { Meta, Story } from '@storybook/react';

import WarningIcon from 'components/Icon/Warning';

import Alert, { AlertProps } from '.';

export default {
  component: Alert,
  args: {
    Icon: WarningIcon,
    title: 'Lorem ipsum',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas massa dolor, scelerisque id diam vitae, scelerisque rutrum felis. Phasellus nec est ligula.',
  },
} as Meta;

const Template = (args: AlertProps) => <Alert {...args} />;

export const Default: Story<AlertProps> = Template.bind({});
Default.storyName = Alert.name;
