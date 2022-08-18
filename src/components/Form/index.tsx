import React, { FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children }: FormProps) => {
  return <form className="form">{children}</form>;
};

export default Form;
