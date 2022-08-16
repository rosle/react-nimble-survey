import React from 'react';

import { resolveInputIdFromName } from 'helpers/formControl';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...inputAttributes }: InputProps) => {
  const inputId = resolveInputIdFromName(inputAttributes);

  return (
    <>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input id={inputId} className="form-control" {...inputAttributes} />
    </>
  );
};

export default Input;
