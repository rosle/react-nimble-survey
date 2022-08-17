import React from 'react';

import Textarea, { textareaTestIds } from './';

describe('Textarea', () => {
  it('renders the textarea with the correct attributes', () => {
    cy.mount(<Textarea name="item_description" rows={5} />);

    cy.findByTestId(textareaTestIds.textarea)
      .should('have.attr', 'id', 'itemDescription')
      .and('have.attr', 'name', 'item_description')
      .and('have.attr', 'rows', '5');
  });

  it('renders label if label attribute is set', () => {
    cy.mount(<Textarea name="item_description" label="Description" />);

    cy.findByTestId(textareaTestIds.label)
      .should('be.visible')
      .and('have.text', 'Description')
      .and('have.attr', 'for', 'itemDescription');
  });

  it('does NOT render label if label attribute is NOT set', () => {
    cy.mount(<Textarea name="first_name" />);

    cy.get(`[data-test-id="${textareaTestIds.label}"]`, { timeout: 0 }).should('not.exist');
  });
});
