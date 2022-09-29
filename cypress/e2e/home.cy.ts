import { buildTokens } from 'tests/factories/token';

describe('Home', () => {
  it('visits the app', () => {
    cy.login();
    cy.visit('/');

    cy.findByText('This is the home page content').should('be.visible');
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
