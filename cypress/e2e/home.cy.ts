import routePath from 'routes/routePath';
import { buildTokens } from 'tests/factories/tokens';

const homeScreenTestIds = {
  loginForm: 'login__form',
  surveyList: 'home__list-survey',
};

describe('Home', () => {
  it('given the user has not logged in, renders the login page', () => {
    cy.visit(routePath.index);

    cy.findByTestId(homeScreenTestIds.loginForm).should('be.visible');
  });

  it('given the user has already logged in, renders the survey list', () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.login();
    cy.visit(routePath.index);

    cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
  });

  context('given the token has already expired', () => {
    it('redirects to the Login page', () => {
      const tokens = buildTokens();

      cy.intercept('GET', '/api/v1/me', { statusCode: 401, fixture: 'invalid_token_error' });

      // On the first render of the page, there is NO user.
      // The API will try fetching the user profile.
      cy.login(null, tokens);
      cy.visit(routePath.index);

      cy.location('pathname').should('eq', routePath.login);
    });
  });
});
