import React from 'react';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.mountWithRouter(<HomeScreen />);

    cy.findByTestId(homeScreenTestIds.todayDate).should('be.visible');
  });

  it('renders the survey list', () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.mountWithRouter(<HomeScreen />);

    cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
  });
});
