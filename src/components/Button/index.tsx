import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonStyle?: 'primary' | 'secondary' | 'link';
  buttonSize?: 'sm' | 'md';
}

// TODO: Override Bootstrap class to be in BEM
const Button = ({ label, buttonStyle = 'primary', buttonSize = 'md' }: ButtonProps) => {
  return <button className={`btn btn-${buttonStyle} btn-${buttonSize}`}>{label}</button>;
};

export default Button;
