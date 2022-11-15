import React from 'react';

import SurveyList, { surveyListTestIds } from '.';

describe('SurveyList', () => {
  it('renders the blank state', () => {
    cy.mount(<SurveyList />);

    cy.findByTestId(surveyListTestIds.blankState)
      .should('be.visible')
      .should('contain.text', '😎')
      .should('contain.text', 'survey:completed');
  });
});
