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

  describe('given the label attribute is set', () => {
    it('renders the label', () => {
      cy.mount(<Textarea name="item_description" label="Description" />);

      cy.findByTestId(textareaTestIds.label)
        .should('be.visible')
        .and('have.text', 'Description')
        .and('have.attr', 'for', 'itemDescription');
    });
  });

  describe('given the label attribute is NOT set', () => {
    it('does NOT render the label', () => {
      cy.mount(<Textarea name="first_name" />);

      cy.get(`[data-test-id="${textareaTestIds.label}"]`, { timeout: 0 }).should('not.exist');
    });
  });
});
