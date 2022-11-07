import React from 'react';

import { caretRightTestId } from 'components/Icon/CaretRight';
import { buildSurvey } from 'tests/factories/survey';

import ListItem, { listItemTestIds } from '.';

describe('ListItem', () => {
  it('displays the survey cover image', () => {
    const survey = buildSurvey();

    cy.mount(<ListItem survey={survey} onSelected={cy.stub()} />);

    cy.findByTestId(listItemTestIds.cover).should('be.visible').should('have.attr', 'src', survey.coverImageUrl);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();

    cy.mount(<ListItem survey={survey} onSelected={cy.stub()} />);

    cy.findByTestId(listItemTestIds.title).should('be.visible').should('have.text', survey.title);
  });

  it('displays the survey description', () => {
    const survey = buildSurvey();

    cy.mount(<ListItem survey={survey} onSelected={cy.stub()} />);

    cy.findByTestId(listItemTestIds.description).should('be.visible').should('have.text', survey.description);
  });

  it('displays the view survey button', () => {
    const survey = buildSurvey();

    cy.mount(<ListItem survey={survey} onSelected={cy.stub()} />);

    cy.findByTestId(listItemTestIds.viewButton).should('be.visible').findByTestId(caretRightTestId).should('be.visible');
  });

  describe('given the user clicks on the view survey button', () => {
    it('triggers onSelected function with the survey info', () => {
      const survey = buildSurvey();
      const mockOnSelectedFn = cy.stub().as('onSelected');

      cy.mount(<ListItem survey={survey} onSelected={mockOnSelectedFn} />);

      cy.findByTestId(listItemTestIds.viewButton)
        .click()
        .then(() => {
          cy.get('@onSelected').should('have.been.calledOnceWith', survey);
        });
    });
  });
});
