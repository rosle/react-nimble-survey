import React from 'react';

import { render, screen } from '@testing-library/react';

import Button, { buttonTestIds } from '.';

describe('Button', () => {
  it('renders a button with the custom label', () => {
    const buttonLabel = 'Sign in';

    render(<Button>{buttonLabel}</Button>);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toBeVisible();
    expect(button).toHaveTextContent(buttonLabel);
  });

  it('renders a primary and md button by default', () => {
    render(<Button>Sign in</Button>);

    const button = screen.getByTestId(buttonTestIds.button);

    // Expect the button to have the exact classes
    expect(button).toHaveAttribute('class', 'btn btn--primary');
  });

  describe('given a secondary buttonStyle', () => {
    it('renders a secondary button', () => {
      render(<Button buttonStyle="secondary">Sign in</Button>);

      const button = screen.getByTestId(buttonTestIds.button);

      expect(button).toHaveClass('btn--secondary');
    });
  });

  describe('given an sm buttonSize', () => {
    it('renders an sm button', () => {
      render(<Button buttonSize="sm">Sign in</Button>);

      const button = screen.getByTestId(buttonTestIds.button);

      expect(button).toHaveClass('btn--sm');
    });
  });

  it('renders a full-width button if fullWidth is set', () => {
    render(<Button fullWidth>Sign in</Button>);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toHaveClass('btn--full-width');
  });
});
