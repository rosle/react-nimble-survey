import React from 'react';

import { render, screen } from '@testing-library/react';

import Button, { buttonTestIds } from '.';

describe('Button', () => {
  it('renders a button with the custom label', () => {
    const buttonLabel = 'Sign in';

    render(<Button label={buttonLabel} />);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toBeVisible();
    expect(button).toHaveTextContent(buttonLabel);
  });

  it('renders a primary and md button by default', () => {
    render(<Button label="Sign in" />);

    const button = screen.getByTestId(buttonTestIds.button);

    // Expect the button to have the exact classes
    expect(button).toHaveAttribute('class', 'btn btn--primary');
  });

  it('renders a secondary button if buttonStyle is secondary', () => {
    render(<Button label="Sign in" buttonStyle="secondary" />);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toHaveClass('btn--secondary');
  });

  it('renders an sm button if buttonSize is sm', () => {
    render(<Button label="Sign in" buttonSize="sm" />);

    const button = screen.getByTestId(buttonTestIds.button);

    expect(button).toHaveClass('btn--sm');
  });
});
