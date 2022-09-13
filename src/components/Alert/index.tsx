import React, { ComponentType } from 'react';

export const alertTestIds = {
  icon: 'alert-icon',
  title: 'alert-title',
  description: 'alert-description',
};

export type AlertProps = {
  Icon: ComponentType;
  title: string;
  children?: React.ReactNode;
};

const Alert = ({ Icon, title, children }: AlertProps) => {
  return (
    <div className="alert">
      <div className="alert__icon" data-test-id={alertTestIds.icon}>
        <Icon />
      </div>
      <div className="alert__body">
        <div className="alert__title" data-test-id={alertTestIds.title}>
          {title}
        </div>
        <div className="alert__description" data-test-id={alertTestIds.description}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Alert;
