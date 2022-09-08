describe('Home', () => {
  it('visits the app', () => {
    cy.login('dev@nimblehq.co', 'secret22');

    cy.visit('/');

    cy.findByText('This is the home page content').should('be.visible');
  });
});
