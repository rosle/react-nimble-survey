const listSurveysTestIds = {
  todayDate: 'home__today-date',
  surveyList: 'home__survey-list',
};

describe('List Surveys', () => {
  it("displays today's date", () => {
    const now = Date.parse('2022-08-22T04:15:27.898Z');
    cy.clock(now, ['Date']);

    cy.login();
    cy.visit('/');

    cy.findByTestId(listSurveysTestIds.todayDate)
      .should('be.visible')
      .should('contain.text', 'Monday, August 22')
      .should('contain.text', 'Today');
  });

  context('given there is NO surveys', () => {
    it('displays the blank state', () => {
      cy.login();
      cy.visit('/');

      cy.findByTestId(listSurveysTestIds.surveyList)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'You’ve completed all the surveys.\nTake a moment.');
    });
  });
});
