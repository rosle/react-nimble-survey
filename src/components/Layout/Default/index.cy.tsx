import React from 'react';

import DefaultLayout, { defaultLayoutTestIds } from '.';

describe('DefaultLayout', () => {
  it('adds the html class', () => {
    cy.mountWithRouter(<DefaultLayout />);

    cy.get('html').should('have.class', 'layout-default');
  });

  it('renders the app logo link', () => {
    cy.mountWithRouter(<DefaultLayout />);

    cy.findByTestId(defaultLayoutTestIds.logoLink).should('be.visible').should('have.attr', 'href', '/');
  });

  describe('given the user has logged in', () => {
    it('renders the the user menu', () => {
      cy.login();

      cy.mountWithRouter(<DefaultLayout />, { withContextProvider: true });

      cy.findByTestId(defaultLayoutTestIds.userMenu).should('be.visible');
    });
  });

  describe('given the user has NOT logged in', () => {
    it('does NOT render the the user menu', () => {
      cy.mountWithRouter(<DefaultLayout />, { withContextProvider: true });

      cy.findByTestId(defaultLayoutTestIds.userMenu).should('not.exist');
    });
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
