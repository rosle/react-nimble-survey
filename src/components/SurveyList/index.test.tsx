import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import { times } from 'lodash';

import { carouselTestIds } from 'components/Carousel';
import { buildSurvey } from 'tests/factories/survey';
import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyList, { surveyListTestIds } from '.';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  describe('given there are surveys', () => {
    it('renders the survey list carousel', async () => {
      const surveys = times(2, () => buildSurvey());

      renderWithRouter(<SurveyList isLoading={false} surveys={surveys} />);

      await waitFor(() => {
        const carousel = screen.getByTestId(surveyListTestIds.carousel);

        expect(carousel).toBeVisible();
      });

      const carouselItems = screen.getAllByTestId(carouselTestIds.carouselItem);
      const surveyListItem0 = within(carouselItems[0]).getByTestId(listItemTestIds.listItem);
      const surveyListItem1 = within(carouselItems[1]).getByTestId(listItemTestIds.listItem);

      expect(surveyListItem0).toHaveTextContent(surveys[0].title);
      expect(surveyListItem1).toHaveTextContent(surveys[1].title);
    });

    it('renders the background image based on the selected survey', async () => {
      const surveys = times(2, () => buildSurvey());

      renderWithRouter(<SurveyList isLoading={false} surveys={surveys} />);

      await waitFor(() => {
        const carousel = screen.getByTestId(surveyListTestIds.carousel);

        expect(carousel).toBeVisible();
      });

      const backgroundImageComp = screen.getByTestId(surveyListTestIds.backgroundImage);
      const backgroundImage = within(backgroundImageComp).getByRole('img');
      const carouselIndicators = screen.getAllByTestId(carouselTestIds.carouselIndicator);

      expect(backgroundImage).toBeVisible();
      expect(backgroundImage).toHaveAttribute('src', surveys[0].coverImageUrl);

      carouselIndicators[1].click();

      await waitFor(() => {
        expect(backgroundImage).toHaveAttribute('src', surveys[1].coverImageUrl);
      });
    });
  });

  describe('given there is NO survey', () => {
    it('renders the blank state', async () => {
      render(<SurveyList isLoading={false} surveys={[]} />);

      await waitFor(() => {
        screen.getByTestId(surveyListTestIds.blankState);
      });

      const blankState = screen.getByTestId(surveyListTestIds.blankState);

      expect(blankState).toBeVisible();
      expect(blankState).toHaveTextContent('😎');
      expect(blankState).toHaveTextContent('survey:completed');
    });
  });
});
