import { buildTokens } from 'tests/factories/token';

const homeScreenTestIds = {
  loginForm: 'login__form',
  surveyList: 'home__survey-list',
};

describe('Home', () => {
  it('given the user has not logged in, renders the login page', () => {
    cy.visit('/');

    cy.findByTestId(homeScreenTestIds.loginForm).should('be.visible');
  });

  it('given the user has already logged in, renders the survey list', () => {
    cy.login();

    cy.visit('/');

    cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
  });

  context('given the token has already expired', () => {
    it('redirects to the Login page', () => {
      const tokens = buildTokens();

      cy.intercept('GET', '/api/v1/me', { statusCode: 401, fixture: 'invalid_token_error' });

      // On the first render of the page, there is NO user.
      // The API will try fetching the user profile.
      cy.login(null, tokens);
      cy.visit('/');

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/sign_in');
      });
    });
  });
});
