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

  describe('given a secondary buttonStyle prop', () => {
    it('renders a secondary button', () => {
      cy.mount(<Button buttonStyle="secondary">Sign in</Button>);

      cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--secondary');
    });
  });

  describe('given an sm buttonSize prop', () => {
    it('renders an sm button', () => {
      cy.mount(<Button buttonSize="sm">Sign in</Button>);

      cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--sm');
    });
  });

  describe('given a fullWidth prop', () => {
    it('renders a full-width button', () => {
      cy.mount(<Button fullWidth>Sign in</Button>);

      cy.findByTestId(buttonTestIds.button).should('have.class', 'btn--full-width');
    });
  });
});
