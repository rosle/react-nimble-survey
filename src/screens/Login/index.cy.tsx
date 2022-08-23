import React from 'react';

import { formTestIds } from 'components/Form';
import { authLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen, { loginScreenTestIds } from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    cy.mount(<LoginScreen />);

    cy.get('html').should('have.class', 'layout-auth');
    cy.findByTestId(authLayoutTestIds.headerTitle).should('have.text', 'auth:heading.sign_in');
  });

  it('displays the error if any of the required inputs is blank', () => {
    cy.mount(<LoginScreen />);

    cy.findByTestId(loginScreenTestIds.loginSubmit).click();

    cy.findByTestId(formTestIds.formError)
      .should('contain.text', 'email shared:form_error.required')
      .should('contain.text', 'password shared:form_error.required');

    cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');

    cy.findByTestId(formTestIds.formError)
      .should('not.contain.text', 'email shared:form_error.required')
      .should('contain.text', 'password shared:form_error.required');
  });
});
