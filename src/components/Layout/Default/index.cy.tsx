import React from 'react';

import DefaultLayout from '.';

describe('DefaultLayout', () => {
  it('adds the html class', () => {
    cy.mountWithRouter(<DefaultLayout></DefaultLayout>);

    cy.get('html').should('have.class', 'layout-default');
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    cy.mountWithRouter(
      <DefaultLayout>
        <p>{childrenContent}</p>
      </DefaultLayout>
    );

    cy.contains(childrenContent).should('be.visible');
  });
});
