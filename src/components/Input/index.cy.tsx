import React from 'react';

import Input, { inputTestIds } from './';

describe('Input', () => {
  it('renders the input with the correct attributes', () => {
    cy.mount(<Input name="first_name" type="text" />);

    cy.findByTestId(inputTestIds.input)
      .should('have.attr', 'id', 'firstName')
      .and('have.attr', 'name', 'first_name')
      .and('have.attr', 'type', 'text');
  });

  it('given the label attribute is set, renders the label', () => {
    cy.mount(<Input name="first_name" type="text" label="First name" />);

    cy.findByTestId(inputTestIds.label).should('be.visible').and('have.text', 'First name').and('have.attr', 'for', 'firstName');
  });

  it('given the label attribute is NOT set, does NOT render the label', () => {
    cy.mount(<Input name="first_name" type="text" />);

    cy.get(`[data-test-id="${inputTestIds.label}"]`, { timeout: 0 }).should('not.exist');
  });
});
