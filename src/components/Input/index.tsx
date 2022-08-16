import React from 'react';

import { resolveInputIdFromName } from 'helpers/formControl';

export const InputTestIds = {
  label: 'input-label',
  input: 'input-control',
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...inputAttributes }: InputProps) => {
  const inputId = resolveInputIdFromName(inputAttributes);

  return (
    <>
      {label && (
        <label htmlFor={inputId} className="form-label" data-test-id={InputTestIds.label}>
          {label}
        </label>
      )}
      <input id={inputId} className="form-control" data-test-id={InputTestIds.input} {...inputAttributes} />
    </>
  );
};

export default Input;
