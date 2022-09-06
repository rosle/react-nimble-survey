import React from 'react';

import { resolveInputIdFromName } from 'helpers/formControl';

export const inputTestIds = {
  label: 'input-label',
  input: 'input-control',
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...inputAttributes }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const inputId = resolveInputIdFromName(inputAttributes);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label" data-test-id={inputTestIds.label}>
          {label}
        </label>
      )}
      <input id={inputId} ref={ref} className="form-control" data-test-id={inputTestIds.input} {...inputAttributes} />
    </div>
  );
};

export default React.forwardRef(Input);
