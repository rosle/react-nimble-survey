import React from 'react';

import WarningIcon, { warningIconTestId } from 'components/Icon/Warning';

import Alert, { alertTestIds } from './';

describe('Alert', () => {
  it('renders the alert icon', () => {
    cy.mount(
      <Alert Icon={WarningIcon} title="Error">
        Something went wrong!
      </Alert>
    );

    cy.findByTestId(alertTestIds.icon).should('be.visible');
    cy.findByTestId(warningIconTestId).should('be.visible');
  });

  it('renders the alert title', () => {
    const title = 'Error';

    cy.mount(
      <Alert Icon={WarningIcon} title={title}>
        Something went wrong!
      </Alert>
    );

    cy.findByTestId(alertTestIds.title).should('be.visible').and('have.text', title);
  });

  it('renders the alert description', () => {
    const description = 'Something went wrong!';

    cy.mount(
      <Alert Icon={WarningIcon} title="Error">
        {description}
      </Alert>
    );

    cy.findByTestId(alertTestIds.description).should('be.visible').and('have.text', description);
  });
});
