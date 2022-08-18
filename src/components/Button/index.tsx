import React from 'react';

import classNames from 'classnames';

export const buttonTestIds = {
  button: 'button',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonStyle?: 'primary' | 'secondary';
  buttonSize?: 'sm' | 'md';
}

const Button = ({ label, buttonStyle = 'primary', buttonSize = 'md' }: ButtonProps) => {
  const classes = classNames('btn', `btn--${buttonStyle}`, { [`btn--${buttonSize}`]: buttonSize !== 'md' });

  return (
    <button className={classes} data-test-id={buttonTestIds.button}>
      {label}
    </button>
  );
};

export default Button;
