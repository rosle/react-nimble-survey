import React from 'react';

import { carouselTestIds } from 'components/Carousel';

import SurveyList, { surveyListTestIds } from '.';
import { mockSurveyList } from './data';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  describe('given there are surveys in the list', () => {
    it('renders the survey list carousel', () => {
      cy.mount(<SurveyList />);

      cy.findByTestId(surveyListTestIds.carousel).should('be.visible');

      cy.findAllByTestId(carouselTestIds.carouselItem).as('carouselItems');

      cy.get('@carouselItems').eq(0).findByTestId(listItemTestIds.listItem).should('contain.text', mockSurveyList[0].title);
      cy.get('@carouselItems').eq(1).findByTestId(listItemTestIds.listItem).should('contain.text', mockSurveyList[1].title);
    });

    it('renders the background image based on the selected survey', () => {
      cy.mount(<SurveyList />);

      cy.findByTestId(surveyListTestIds.backgroundImage).should('be.visible').findByRole('img').as('backgroundImage');
      cy.findAllByTestId(carouselTestIds.carouselIndicator).as('carouselIndicators');

      cy.get('@backgroundImage').should('have.attr', 'src', mockSurveyList[0].coverImageUrl);

      cy.get('@carouselIndicators').eq(1).click();

      cy.get('@backgroundImage').should('have.attr', 'src', mockSurveyList[1].coverImageUrl);
    });
  });

  describe('given there is NO survey in the list', () => {
    it('renders the blank state', () => {
      cy.mount(<SurveyList blank />);

      cy.findByTestId(surveyListTestIds.blankState)
        .should('be.visible')
        .should('contain.text', '😎')
        .should('contain.text', 'survey:completed');
    });
  });
});
