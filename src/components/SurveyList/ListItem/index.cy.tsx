import React from 'react';

import { caretRightTestId } from 'components/Icon/CaretRight';
import { buildSurvey } from 'tests/factories/survey';

import ListItem, { listItemTestIds } from '.';

describe('ListItem', () => {
  it('displays the high resolution survey cover image', () => {
    const survey = buildSurvey();

    cy.mountWithRouter(<ListItem survey={survey} />);

    cy.findByTestId(listItemTestIds.cover).should('be.visible').should('have.attr', 'src', survey.coverImageUrlLarge);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();

    cy.mountWithRouter(<ListItem survey={survey} />);

    cy.findByTestId(listItemTestIds.title).should('be.visible').should('have.text', survey.title);
  });

  it('displays the survey description', () => {
    const survey = buildSurvey();

    cy.mountWithRouter(<ListItem survey={survey} />);

    cy.findByTestId(listItemTestIds.description).should('be.visible').should('have.text', survey.description);
  });

  it('displays the button link to view the survey', () => {
    const survey = buildSurvey();

    cy.mountWithRouter(<ListItem survey={survey} />);

    cy.findByTestId(listItemTestIds.viewButton)
      .should('be.visible')
      .should('have.attr', 'href', `/surveys/${survey.id}`)
      .findByTestId(caretRightTestId)
      .should('be.visible');
  });
});
