import React from 'react';

import { Meta, Story } from '@storybook/react';

import CaretRightIcon from './CaretRight';
import NotificationIcon from './Notification';
import WarningIcon from './Warning';

export default { component: WarningIcon } as Meta;

export const All = () => (
  <>
    <CaretRightIcon />
    <NotificationIcon />
    <WarningIcon />
  </>
);

export const CaretRight: Story = () => <CaretRightIcon />;
export const Notification: Story = () => <NotificationIcon />;
export const Warning: Story = () => <WarningIcon />;
