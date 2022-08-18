import React from 'react';

import classNames from 'classnames';

export const buttonTestIds = {
  button: 'button',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'primary' | 'secondary';
  buttonSize?: 'sm' | 'md';
  children: React.ReactNode;
}

const Button = ({ buttonStyle = 'primary', buttonSize = 'md', children }: ButtonProps) => {
  const classes = classNames('btn', `btn--${buttonStyle}`, { [`btn--${buttonSize}`]: buttonSize !== 'md' });

  return (
    <button className={classes} data-test-id={buttonTestIds.button}>
      {children}
    </button>
  );
};

export default Button;
