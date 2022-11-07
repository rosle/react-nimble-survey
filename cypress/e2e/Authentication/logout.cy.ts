const HomeScreenTestIds = {
  userMenu: 'user-menu',
};

describe('Logout', () => {
  it('redirects to the Login page', () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.login();
    cy.visit('/');

    cy.intercept('POST', '/api/v1/oauth/revoke', { statusCode: 200 });

    cy.findByTestId(HomeScreenTestIds.userMenu).click();
    cy.findByText('Logout').click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/sign_in');
    });
  });
});
