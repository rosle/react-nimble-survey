import React from 'react';

import { Meta, Story } from '@storybook/react';

import CaretLeftIcon from './CaretLeft';
import CaretRightIcon from './CaretRight';
import NotificationIcon from './Notification';
import WarningIcon from './Warning';

export default { component: WarningIcon } as Meta;

export const All = () => (
  <>
    <CaretLeftIcon />
    <CaretRightIcon />
    <NotificationIcon />
    <WarningIcon />
  </>
);

export const CaretLeft: Story = () => <CaretLeftIcon />;
export const CaretRight: Story = () => <CaretRightIcon />;
export const Notification: Story = () => <NotificationIcon />;
export const Warning: Story = () => <WarningIcon />;
