describe('Home', () => {
  it('visits the app', () => {
    cy.login();

    cy.visit('/');

    cy.findByText('This is the home page content').should('be.visible');
  });
});
