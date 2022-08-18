import React from 'react';

import Button, { buttonTestIds } from '.';

describe('Button', () => {
  it('renders a button with the custom label', () => {
    const buttonLabel = 'Sign in';

    cy.mount(<Button label={buttonLabel} />);

    cy.findByTestId(buttonTestIds.button).should('be.visible').and('have.text', buttonLabel);
  });

  it('renders a primary and md button by default', () => {
    cy.mount(<Button label="Sign in" />);

    // Expect the button to have the exact classes
    cy.findByTestId(buttonTestIds.button).should('have.attr', 'class', 'btn btn--primary');
  });

  it('renders a secondary button if buttonStyle is secondary', () => {
    cy.mount(<Button label="Sign in" buttonStyle="secondary" />);

    cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--secondary');
  });

  it('renders an sm button if buttonSize is sm', () => {
    cy.mount(<Button label="Sign in" buttonSize="sm" />);

    cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--sm');
  });
});
