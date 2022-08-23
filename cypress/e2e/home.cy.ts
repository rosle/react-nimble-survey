describe('Home', () => {
  it('visits the app', () => {
    cy.visit('/');

    cy.findByTestId('app-link').should('be.visible').and('have.text', 'Learn React');
  });
});
