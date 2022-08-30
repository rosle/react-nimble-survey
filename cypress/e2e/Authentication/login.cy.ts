// TODO: How to reuse the component's test ids
const loginScreenTestIds = {
  loginForm: 'login-form',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

describe('Login', () => {
  context('given a valid credential', () => {
    it('redirects to the Home page', () => {
      cy.visit('sign_in');

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('secret22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 200, fixture: 'login_success' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });
    });
  });
});
