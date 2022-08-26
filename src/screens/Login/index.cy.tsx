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

  describe('given the valid inputs', () => {
    // TODO: Add expectation after form submit on issue#6
    it('does NOT display the error', () => {
      cy.mount(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('secret1234');

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('not.exist');
    });
  });

  describe('given the INVALID inputs', () => {
    it('displays the errors', () => {
      cy.mount(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError)
        .should('contain.text', 'Email shared:form_error.required')
        .should('contain.text', 'Password shared:form_error.required');

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('123456');

      cy.findByTestId(formTestIds.formError)
        .should('contain.text', 'Email shared:form_error.pattern')
        .should('not.contain.text', 'Password shared:form_error.required');
    });
  });
});
