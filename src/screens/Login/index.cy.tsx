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

  describe('given the valid credential', () => {
    it('does NOT display the errors', () => {
      cy.mountWithRouter(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('secret22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 200, fixture: 'login_success' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('not.exist');

      // When using `navigate('/')`, Cypress component test stuck in a loop to load user profile.
      // Page changing in Component testing is NOT supported right now according to:
      // https://github.com/cypress-io/cypress/issues/17943#issuecomment-1071894809
    });
  });

  describe('given the INVALID inputs', () => {
    it('displays the validation errors', () => {
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

  describe('given the INVALID credential', () => {
    it('displays the API errors', () => {
      cy.mountWithRouter(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('invalid22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 400, fixture: 'login_failed' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('contain.text', 'Your email or password is incorrect. Please try again.');
    });
  });

  describe('given the API request failed', () => {
    it('displays the generic errors', () => {
      cy.mountWithRouter(<LoginScreen />);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('invalid22');

      cy.intercept('POST', '/api/v1/oauth/token', { forceNetworkError: true });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.findByTestId(formTestIds.formError).should('contain.text', 'shared:generic_error');
    });
  });
});
