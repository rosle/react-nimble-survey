import React from 'react';

import routePath from 'routes/routePath';

import SurveyScreen, { surveyScreenTestIds } from '.';

describe('SurveyScreen', () => {
  it('displays the back navigation to the Home page', () => {
    cy.mountWithRouter(<SurveyScreen />);

    cy.findByTestId(surveyScreenTestIds.backNavigation).should('be.visible').should('have.attr', 'href', routePath.index);
  });

  it('displays the survey intro', () => {
    cy.mountWithRouter(<SurveyScreen />);

    cy.findByTestId(surveyScreenTestIds.surveyIntro).should('be.visible');
  });
});
