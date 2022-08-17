import React from 'react';

import { authLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    cy.mount(<LoginScreen />);

    cy.get('html').should('have.class', 'layout-auth');
    cy.findByTestId(authLayoutTestIds.headerTitle).should('have.text', 'auth:sign_in');
  });
});