import React from 'react';

import { resolveInputIdFromName } from 'helpers/formControl';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, ...textareaAttributes }: TextareaProps) => {
  const inputId = resolveInputIdFromName(textareaAttributes);

  return (
    <>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <textarea id={inputId} className="form-control" {...textareaAttributes} />
    </>
  );
};

export default Textarea;
