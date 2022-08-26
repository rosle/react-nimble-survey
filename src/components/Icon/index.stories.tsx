import React from 'react';

import { Meta, Story } from '@storybook/react';

import NotificationIcon from './Notification';
import WarningIcon from './Warning';

export default { component: WarningIcon } as Meta;

export const All = () => (
  <>
    <NotificationIcon />
    <WarningIcon />
  </>
);

export const Notification: Story = () => <NotificationIcon />;
export const Warning: Story = () => <WarningIcon />;
