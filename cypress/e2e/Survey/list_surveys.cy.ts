import { generatePath } from 'react-router-dom';

import routePath from 'routes/routePath';

const listSurveysTestIds = {
  todayDate: 'home__today-date',
  surveyList: 'home__list-survey',
  surveyListBackgroundImage: 'list-survey__background-image',
  surveyListCarousel: 'list-survey__carousel',
  surveyListCarouselIndicator: 'carousel-indicator',
  surveyListItem: 'list-survey-item',
  surveyListItemViewButton: 'list-survey-item__action--view',
  surveyListBlankState: 'list-survey__blank-state',
  surveyListLoadingState: 'list-survey__loading-state',
};

describe('List Surveys', () => {
  it("displays today's date", () => {
    const now = Date.parse('2022-08-22T04:15:27.898Z');
    cy.clock(now, ['Date']);

    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.login();
    cy.visit(routePath.index);

    cy.findByTestId(listSurveysTestIds.todayDate)
      .should('be.visible')
      .should('contain.text', 'Monday, August 22')
      .should('contain.text', 'Today');
  });

  context('given there are surveys', () => {
    it('displays the survey list', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' }).as('listSurveys');

      cy.login();
      cy.visit(routePath.index);

      cy.findByTestId(listSurveysTestIds.surveyListLoadingState).should('be.visible');

      cy.wait('@listSurveys');

      cy.findByTestId(listSurveysTestIds.surveyList).should('be.visible');
      cy.findByTestId(listSurveysTestIds.surveyListCarousel).should('be.visible');
    });

    it('displays the survey list items', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

      cy.login();
      cy.visit(routePath.index);

      cy.findByTestId(listSurveysTestIds.surveyListBackgroundImage).should('be.visible').findByRole('img').as('backgroundImage');
      cy.findAllByTestId(listSurveysTestIds.surveyListItem).should('be.visible').as('surveyListItems');
      cy.findAllByTestId(listSurveysTestIds.surveyListCarouselIndicator).should('be.visible').as('surveyListCarouselIndicators');

      cy.get('@backgroundImage').should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_');
      cy.get('@surveyListItems').eq(0).should('be.visible').should('contain.text', 'Scarlett Bangkok');

      cy.get('@surveyListCarouselIndicators').eq(1).click();

      cy.get('@backgroundImage').should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_');
      cy.get('@surveyListItems').eq(1).should('be.visible').should('contain.text', 'ibis Bangkok Riverside');
    });
  });

  context('given there is NO survey', () => {
    it('displays the survey list blank state', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success_empty' }).as('listSurveys');

      cy.login();
      cy.visit(routePath.index);

      cy.findByTestId(listSurveysTestIds.surveyListLoadingState).should('be.visible');

      cy.wait('@listSurveys');

      cy.findByTestId(listSurveysTestIds.surveyList).should('be.visible');

      cy.findByTestId(listSurveysTestIds.surveyListBlankState)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'You’ve completed all the surveys.\nTake a moment.');
    });
  });
});
