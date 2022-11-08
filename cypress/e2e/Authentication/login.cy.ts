import routePath from 'routes/routePath';

const loginScreenTestIds = {
  loginForm: 'login__form',
  loginEmail: 'login__form-input-email',
  loginPassWord: 'login__form-input-password',
  loginSubmit: 'login__form-button-submit',
};

describe('Login', () => {
  context('given a valid credential', () => {
    it('redirects to the Home page', () => {
      cy.visit(routePath.login);

      cy.findByTestId(loginScreenTestIds.loginEmail).type('rossukhon@nimblehq.co');
      cy.findByTestId(loginScreenTestIds.loginPassWord).type('secret22');

      cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 200, fixture: 'login_success' });
      cy.intercept('GET', '/api/v1/me', { statusCode: 200, fixture: 'get_user_profile_success' });
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

      cy.findByTestId(loginScreenTestIds.loginSubmit).click();

      cy.location('pathname').should('eq', routePath.index);
    });
  });
});
