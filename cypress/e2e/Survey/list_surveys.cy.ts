import { mockSurveyList } from 'components/SurveyList/data';

const listSurveysTestIds = {
  todayDate: 'home__today-date',
  surveyList: 'home__list-survey',
  surveyListBackgroundImage: 'list-survey__background-image',
  surveyListCarousel: 'list-survey__carousel',
  surveyListCarouselIndicator: 'carousel-indicator',
  surveyListItem: 'list-survey-item',
  surveyListBlankState: 'list-survey__blank-state',
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

  context('given there are surveys', () => {
    it('displays the survey list', () => {
      cy.login();
      cy.visit('/');

      cy.findByTestId(listSurveysTestIds.surveyList).should('be.visible');
      cy.findByTestId(listSurveysTestIds.surveyListCarousel).should('be.visible');
    });

    it('displays the survey list items', () => {
      cy.login();
      cy.visit('/');

      cy.findByTestId(listSurveysTestIds.surveyListBackgroundImage)
        .should('be.visible')
        .findByRole('img')
        .as('surveyListBackgroundImage');

      cy.findAllByTestId(listSurveysTestIds.surveyListItem).should('be.visible').as('surveyListItems');
      cy.findAllByTestId(listSurveysTestIds.surveyListCarouselIndicator).should('be.visible').as('surveyListCarouselIndicators');

      cy.get('@surveyListBackgroundImage').should('have.attr', 'src', mockSurveyList[0].coverImageUrl);
      cy.get('@surveyListItems').eq(0).should('be.visible').should('contain.text', mockSurveyList[0].title);

      cy.get('@surveyListCarouselIndicators').eq(1).click();

      cy.get('@surveyListBackgroundImage').should('have.attr', 'src', mockSurveyList[1].coverImageUrl);
      cy.get('@surveyListItems').eq(1).should('be.visible').should('contain.text', mockSurveyList[1].title);
    });
  });

  // TODO: Enable this test again after connected to the API on #19
  context.skip('given there is NO survey', () => {
    it('displays the survey list blank state', () => {
      cy.login();
      cy.visit('/');

      cy.findByTestId(listSurveysTestIds.surveyList).should('be.visible');

      cy.findByTestId(listSurveysTestIds.surveyListBlankState)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'You’ve completed all the surveys.\nTake a moment.');
    });
  });
});
