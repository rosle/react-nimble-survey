import React from 'react';

import classNames from 'classnames';

export const buttonTestIds = {
  button: 'button',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'primary' | 'secondary' | 'link';
  buttonSize?: 'sm' | 'md';
  fullWidth?: boolean;
}

const Button = ({
  buttonStyle = 'primary',
  buttonSize = 'md',
  children,
  fullWidth = false,
  className,
  ...buttonAttributes
}: ButtonProps) => {
  const classes = classNames(className, 'btn', `btn--${buttonStyle}`, {
    [`btn--${buttonSize}`]: buttonSize !== 'md',
    'btn--full-width': fullWidth,
  });

  return (
    <button className={classes} data-test-id={buttonTestIds.button} {...buttonAttributes}>
      {children}
    </button>
  );
};

export default Button;
