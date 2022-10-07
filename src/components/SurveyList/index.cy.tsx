import React from 'react';

import { carouselTestIds } from 'components/Carousel';

import SurveyList, { surveyListTestIds } from '.';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  describe('given there are surveys', () => {
    it('renders the survey list carousel', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

      cy.mount(<SurveyList />);

      cy.findByTestId(surveyListTestIds.carousel).should('be.visible');

      cy.findAllByTestId(carouselTestIds.carouselItem).should('have.length', 5).as('carouselItems');

      cy.get('@carouselItems').eq(0).findByTestId(listItemTestIds.listItem).should('contain.text', 'Scarlett Bangkok');
      cy.get('@carouselItems').eq(1).findByTestId(listItemTestIds.listItem).should('contain.text', 'ibis Bangkok Riverside');
    });

    it('renders the background image based on the selected survey', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

      cy.mount(<SurveyList />);

      cy.findByTestId(surveyListTestIds.backgroundImage).should('be.visible').findByRole('img').as('backgroundImage');
      cy.findAllByTestId(carouselTestIds.carouselIndicator).as('carouselIndicators');

      cy.get('@backgroundImage').should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_');

      cy.get('@carouselIndicators').eq(1).click();

      cy.get('@backgroundImage').should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_');
    });
  });

  describe('given there is NO survey', () => {
    it('renders the blank state', () => {
      cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success_empty' });

      cy.mount(<SurveyList />);

      cy.findByTestId(surveyListTestIds.blankState)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'survey:completed');
    });
  });
});
