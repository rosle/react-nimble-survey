import React from 'react';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    cy.mountWithRouter(<HomeScreen />);

    cy.findByTestId(homeScreenTestIds.todayDate).should('be.visible');
  });

  it('renders the survey list', () => {
    cy.mountWithRouter(<HomeScreen />);

    cy.findByTestId(homeScreenTestIds.surveyList).should('be.visible');
  });
});
