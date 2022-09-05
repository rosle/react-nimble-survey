const loginTestIds = {
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

const login = (email: string, password: string) => {
  // TODO: Move to use cy.session
  // Right now having issue when run cypress:e2e, it fails.
  // Even though running with cypress:open passes. Not sure what is the issue yet.
  // This might be related:
  // https://github.com/cypress-io/cypress/issues/22751
  // cy.session([email, password], () => {
  cy.visit('/sign_in');

  cy.findByTestId(loginTestIds.loginEmail).type(email);
  cy.findByTestId(loginTestIds.loginPassWord).type(password);

  cy.intercept('POST', '/api/v1/oauth/token', { statusCode: 200, fixture: 'login_success' });
  cy.intercept('GET', '/api/v1/me', { statusCode: 200, fixture: 'user_success' });

  cy.findByTestId(loginTestIds.loginSubmit).click();

  cy.url().should('contain', '/');
};

Cypress.Commands.add('login', login);
