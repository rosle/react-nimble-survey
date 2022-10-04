import React from 'react';

import { render, screen, within } from '@testing-library/react';

import { carouselTestIds } from 'components/Carousel';

import SurveyList, { surveyListTestIds } from '.';
import { mockSurveyList } from './data';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  describe('given there are surveys in the list', () => {
    it('renders the survey list carousel', () => {
      render(<SurveyList />);

      const carousel = screen.getByTestId(surveyListTestIds.carousel);

      expect(carousel).toBeVisible();

      const carouselItems = screen.getAllByTestId(carouselTestIds.carouselItem);

      const surveyListItem0 = within(carouselItems[0]).getByTestId(listItemTestIds.listItem);
      const surveyListItem1 = within(carouselItems[1]).getByTestId(listItemTestIds.listItem);

      expect(surveyListItem0).toHaveTextContent(mockSurveyList[0].title);
      expect(surveyListItem1).toHaveTextContent(mockSurveyList[1].title);
    });
  });

  describe('given there is NO survey in the list', () => {
    it('renders the blank state', () => {
      render(<SurveyList blank />);

      const blankState = screen.getByTestId(surveyListTestIds.blankState);

      expect(blankState).toBeVisible();
      expect(blankState).toHaveTextContent('😎');
      expect(blankState).toHaveTextContent('survey:completed');
    });
  });
});
