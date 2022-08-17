import React from 'react';

import { render, screen } from '@testing-library/react';

import Textarea, { TextareaTestIds } from './';

describe('Textarea', () => {
  it('renders the textarea with the correct attributes', () => {
    render(<Textarea name="item_description" rows={5} />);

    const textarea = screen.getByTestId(TextareaTestIds.textarea);

    expect(textarea).toHaveAttribute('id', 'itemDescription');
    expect(textarea).toHaveAttribute('name', 'item_description');
    expect(textarea).toHaveAttribute('rows', "5");
  });

  it('renders label if label attribute is set', () => {
    render(<Textarea name="item_description" label="Description" />);

    const textareaLabel = screen.getByTestId(TextareaTestIds.label);

    expect(textareaLabel).toBeVisible();
    expect(textareaLabel).toHaveTextContent('Description');
    expect(textareaLabel).toHaveAttribute('for', 'itemDescription');
  });

  it('does NOT render label if label attribute is NOT set', () => {
    render(<Textarea name="first_name" />);

    const textareaLabel = screen.queryByTestId(TextareaTestIds.label);

    expect(textareaLabel).not.toBeInTheDocument();
  });
});
