import React from 'react';

import AuthLayout, { AuthLayoutTestIds } from '.';

describe('AuthLayout', () => {
  it('adds the html class', () => {
    cy.mount(<AuthLayout headerTitle="Sign in"></AuthLayout>);

    cy.get('html').should('have.class', 'layout-auth');
  });

  it('renders the app logo', () => {
    cy.mount(<AuthLayout headerTitle="Sign in"></AuthLayout>);

    cy.findByTestId(AuthLayoutTestIds.headerLogo).should('be.visible');
  });

  it('renders the header title', () => {
    const headerTitle = 'Sign in to Nimble';

    cy.mount(<AuthLayout headerTitle={headerTitle}></AuthLayout>);

    cy.findByTestId(AuthLayoutTestIds.headerTitle).should('be.visible').and('have.text', headerTitle);
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    cy.mount(
      <AuthLayout headerTitle="Sign in">
        <p>{childrenContent}</p>
      </AuthLayout>
    );

    cy.contains(childrenContent).should('be.visible');
  });
});
