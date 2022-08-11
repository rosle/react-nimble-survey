import React from 'react';

import { AuthLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    cy.mount(<LoginScreen />);

    cy.get('html').should('have.class', 'layout-auth');
    cy.findByTestId(AuthLayoutTestIds.headerTitle).should('contain.text', 'sign_in');
  });
});
