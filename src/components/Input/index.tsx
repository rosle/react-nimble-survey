import React from 'react';

import _ from 'lodash';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
};

const Input = ({ label, ...inputProperties }: InputProps) => {
  const id = inputProperties?.id;
  const name = inputProperties?.name;
  const inputId = id || (name &&_.camelCase(name));

  return (
    <>
      { label && <label htmlFor={inputId} className='form-label'>{label}</label> }
      <input id={inputId} className='form-control' { ...inputProperties } />
    </>
  );
};

export default Input;
