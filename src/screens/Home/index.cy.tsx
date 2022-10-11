import React from 'react';

import { surveyListTestIds } from 'components/SurveyList';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.mountWithRouter(<HomeScreen />);

    cy.findByTestId(homeScreenTestIds.todayDate).should('be.visible');
  });

  describe('given there are surveys', () => {
    it('renders the survey list carousel', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

      cy.mountWithRouter(<HomeScreen />);

      cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
      cy.findByTestId(surveyListTestIds.carousel).should('be.visible');
    });
  });

  describe('given there is NO survey', () => {
    it('renders the survey list blank state', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success_empty' });

      cy.mountWithRouter(<HomeScreen />);

      cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
      cy.findByTestId(surveyListTestIds.blankState).should('be.visible');
    });
  });
});
