import React from 'react';

import { render, screen } from '@testing-library/react';

import Input, { inputTestIds } from './';

describe('Input', () => {
  it('renders the input with the correct attributes', () => {
    render(<Input name="first_name" type="text" />);

    const input = screen.getByTestId(inputTestIds.input);

    expect(input).toHaveAttribute('id', 'firstName');
    expect(input).toHaveAttribute('name', 'first_name');
    expect(input).toHaveAttribute('type', 'text');
  });

  describe('given the label attribute is set', () => {
    it('renders the label', () => {
      render(<Input name="first_name" type="text" label="First name" />);

      const inputLabel = screen.getByTestId(inputTestIds.label);

      expect(inputLabel).toBeVisible();
      expect(inputLabel).toHaveTextContent('First name');
      expect(inputLabel).toHaveAttribute('for', 'firstName');
    });
  });

  describe('given the label attribute is NOT set', () => {
    it('does NOT render the label', () => {
      render(<Input name="first_name" type="text" />);

      const inputLabel = screen.queryByTestId(inputTestIds.label);

      expect(inputLabel).not.toBeInTheDocument();
    });
  });
});
