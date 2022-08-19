import React from 'react';

import classNames from 'classnames';

export const buttonTestIds = {
  button: 'button',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'primary' | 'secondary';
  buttonSize?: 'sm' | 'md';
  fullWidth?: boolean;
}

const Button = ({ buttonStyle = 'primary', buttonSize = 'md', children, fullWidth = false }: ButtonProps) => {
  const classes = classNames('btn', `btn--${buttonStyle}`, {
    [`btn--${buttonSize}`]: buttonSize !== 'md',
    'btn--w-100': fullWidth,
  });

  return (
    <button className={classes} data-test-id={buttonTestIds.button}>
      {children}
    </button>
  );
};

export default Button;
