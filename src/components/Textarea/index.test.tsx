import React from 'react';

import { render, screen } from '@testing-library/react';

import Textarea, { textareaTestIds } from './';

describe('Textarea', () => {
  it('renders the textarea with the correct attributes', () => {
    render(<Textarea name="item_description" rows={5} />);

    const textarea = screen.getByTestId(textareaTestIds.textarea);

    expect(textarea).toHaveAttribute('id', 'itemDescription');
    expect(textarea).toHaveAttribute('name', 'item_description');
    expect(textarea).toHaveAttribute('rows', '5');
  });

  describe('given the label attribute is set', () => {
    it('renders the label', () => {
      render(<Textarea name="item_description" label="Description" />);

      const textareaLabel = screen.getByTestId(textareaTestIds.label);

      expect(textareaLabel).toBeVisible();
      expect(textareaLabel).toHaveTextContent('Description');
      expect(textareaLabel).toHaveAttribute('for', 'itemDescription');
    });
  });

  describe('given the label attribute is NOT set', () => {
    it('does NOT render the label', () => {
      render(<Textarea name="first_name" />);

      const textareaLabel = screen.queryByTestId(textareaTestIds.label);

      expect(textareaLabel).not.toBeInTheDocument();
    });
  });
});
