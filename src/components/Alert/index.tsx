import React, { ComponentType } from 'react';

export type AlertProps = {
  Icon: ComponentType;
  title: string;
  children?: React.ReactNode;
};

const Alert = ({ Icon, title, children }: AlertProps) => {
  return (
    <div className="alert">
      <div className="alert__icon">
        <Icon />
      </div>
      <div className="alert__body">
        <div className="alert__title">{title}</div>
        <div className="alert__description">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
