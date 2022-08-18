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

  it('renders a secondary button if buttonStyle is secondary', () => {
    render(<Button buttonStyle="secondary">Sign in</Button>);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toHaveClass('btn--secondary');
  });

  it('renders an sm button if buttonSize is sm', () => {
    render(<Button buttonSize="sm">Sign in</Button>);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toHaveClass('btn--sm');
  });
});
