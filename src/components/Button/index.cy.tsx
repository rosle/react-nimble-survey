import React from 'react';

import Button, { buttonTestIds } from '.';

describe('Button', () => {
  it('renders a button with the custom label', () => {
    const buttonLabel = 'Sign in';

    cy.mount(<Button>{buttonLabel}</Button>);

    cy.findByTestId(buttonTestIds.button).should('be.visible').and('have.text', buttonLabel);
  });

  it('renders a primary and md button by default', () => {
    cy.mount(<Button>Sign in</Button>);

    // Expect the button to have the exact classes
    cy.findByTestId(buttonTestIds.button).should('have.attr', 'class', 'btn btn--primary');
  });

  it('renders a secondary button if buttonStyle is secondary', () => {
    cy.mount(<Button buttonStyle="secondary">Sign in</Button>);

    cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--secondary');
  });

  it('renders an sm button if buttonSize is sm', () => {
    cy.mount(<Button buttonSize="sm">Sign in</Button>);

    cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--sm');
  });
});
