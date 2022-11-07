import React from 'react';

import { times } from 'lodash';

import { carouselTestIds } from 'components/Carousel';
import { buildSurvey } from 'tests/factories/survey';

import SurveyList, { surveyListTestIds } from '.';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  it('renders the loading state', () => {
    cy.mount(<SurveyList isLoading={true} surveys={[]} />);

    cy.findByTestId(surveyListTestIds.loadingState).should('be.visible');
  });

  describe('given there are surveys', () => {
    it('renders the survey list carousel', () => {
      const surveys = times(2, () => buildSurvey());

      cy.mountWithRouter(<SurveyList isLoading={false} surveys={surveys} />);

      cy.findByTestId(surveyListTestIds.loadingState).should('not.exist');
      cy.findByTestId(surveyListTestIds.carousel).should('be.visible');

      cy.findAllByTestId(carouselTestIds.carouselItem).should('have.length', 2).as('carouselItems');

      cy.get('@carouselItems').eq(0).findByTestId(listItemTestIds.listItem).should('contain.text', surveys[0].title);
      cy.get('@carouselItems').eq(1).findByTestId(listItemTestIds.listItem).should('contain.text', surveys[1].title);
    });

    it('renders the background image based on the selected survey', () => {
      const surveys = times(2, () => buildSurvey());

      cy.mountWithRouter(<SurveyList isLoading={false} surveys={surveys} />);

      cy.findByTestId(surveyListTestIds.loadingState).should('not.exist');
      cy.findByTestId(surveyListTestIds.backgroundImage).should('be.visible').findByRole('img').as('backgroundImage');
      cy.findAllByTestId(carouselTestIds.carouselIndicator).as('carouselIndicators');

      cy.get('@backgroundImage').should('have.attr', 'src', surveys[0].coverImageUrl);

      cy.get('@carouselIndicators').eq(1).click();

      cy.get('@backgroundImage').should('have.attr', 'src', surveys[1].coverImageUrl);
    });
  });

  describe('given there is NO survey', () => {
    it('renders the blank state', () => {
      cy.mount(<SurveyList isLoading={false} surveys={[]} />);

      cy.findByTestId(surveyListTestIds.loadingState).should('not.exist');

      cy.findByTestId(surveyListTestIds.blankState)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'survey:completed');
    });
  });
});
