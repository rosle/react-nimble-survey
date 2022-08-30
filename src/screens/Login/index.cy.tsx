import React from 'react';

import { formTestIds } from 'components/Form';
import { authLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen, { loginScreenTestIds } from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    cy.mountWithRouter(<LoginScreen />);

    cy.get('html').should('have.class', 'layout-auth');
    cy.findByTestId(authLayoutTestIds.headerTitle).should('have.text', 'auth:heading.sign_in');
  });

  describe('given the valid inputs', () => {
    it('does NOT display the errors and redirects to the Home page', () => {
      cy.mountWithRouter(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('secret22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 200, fixture: 'login_success' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('not.exist');

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/')
      });
    });
  });

  describe('given the INVALID inputs', () => {
    it('displays the errors', () => {
      cy.mountWithRouter(<LoginScreen />);

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

  describe('given the INVALID credentials', () => {
    it('displays the errors', () => {
      cy.mountWithRouter(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('invalid22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 400, fixture: 'login_failed' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('contain.text', 'Your email or password is incorrect. Please try again.');
    });
  });
});
