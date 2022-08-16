import React from 'react';

import Input, { InputTestIds } from './';

describe('Input', () => {
  it('renders the input with the correct attributes', () => {
    cy.mount(<Input name="first_name" type="text" />);

    cy.findByTestId(InputTestIds.input)
      .should('have.attr', 'id', 'firstName')
      .and('have.attr', 'name', 'first_name')
      .and('have.attr', 'type', 'text');
  });

  it('renders label if label attribute is set', () => {
    cy.mount(<Input name="first_name" type="text" label="First name" />);

    cy.findByTestId(InputTestIds.label).should('be.visible').and('have.text', 'First name').and('have.attr', 'for', 'firstName');
  });

  it('does NOT render label if label attribute is NOT set', () => {
    cy.mount(<Input name="first_name" type="text" />);

    cy.get("[data-test='#{InputTestIds.label}']", { timeout: 0 }).should('not.exist');
  });
});
