import React from 'react';

import routePath from 'routes/routePath';

import SurveyScreen, { surveyScreenTestIds } from '.';

describe('SurveyScreen', () => {
  it('displays the back navigation to the Home page', () => {
    cy.mountWithRouter(<SurveyScreen />);

    cy.findByTestId(surveyScreenTestIds.backNavigation).should('be.visible').should('have.attr', 'href', routePath.index);
  });

  it('displays the survey intro', () => {
    const surveyId = 'd5de6a8f8f5f1cfe51bc';

    cy.intercept('GET', `/api/v1/surveys/${surveyId}`, { statusCode: 200, fixture: 'get_survey_success' });

    cy.mountWithMemoryRouter(<SurveyScreen />, {
      initialEntries: [`/surveys/${surveyId}`],
      routePath: routePath.survey,
    });

    cy.findByTestId(surveyScreenTestIds.surveyIntro).should('be.visible');
  });
});
