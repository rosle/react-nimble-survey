import React from 'react';

import { resolveInputIdFromName } from 'helpers/formControl';

export const textareaTestIds = {
  label: 'textarea-label',
  textarea: 'textarea-control',
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, ...textareaAttributes }: TextareaProps) => {
  const inputId = resolveInputIdFromName(textareaAttributes);

  return (
    <>
      {label && (
        <label htmlFor={inputId} className="form-label" data-test-id={textareaTestIds.label}>
          {label}
        </label>
      )}
      <textarea id={inputId} className="form-control" data-test-id={textareaTestIds.textarea} {...textareaAttributes} />
    </>
  );
};

export default Textarea;
