describe('Home', () => {
  it('visits the app', () => {
    cy.login('dev@nimblehq.co', 'secret22');

    cy.visit('/');

    cy.findByTestId('app-link').should('be.visible').and('have.text', 'Learn React');
  });
});
