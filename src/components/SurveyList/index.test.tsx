import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';

import { carouselTestIds } from 'components/Carousel';
import { setupPolly } from 'tests/setupPolly';

import SurveyList, { surveyListTestIds } from '.';
import { listItemTestIds } from './ListItem';

describe('SurveyList', () => {
  describe('given there are surveys', () => {
    it('renders the survey list carousel', async () => {
      const polly = setupPolly('list_survey_success');

      render(<SurveyList />);

      await waitFor(() => {
        const carousel = screen.getByTestId(surveyListTestIds.carousel);

        expect(carousel).toBeVisible();
      });

      const carouselItems = screen.getAllByTestId(carouselTestIds.carouselItem);

      expect(carouselItems).toHaveLength(5);

      const surveyListItem0 = within(carouselItems[0]).getByTestId(listItemTestIds.listItem);
      const surveyListItem1 = within(carouselItems[1]).getByTestId(listItemTestIds.listItem);

      expect(surveyListItem0).toHaveTextContent('Scarlett Bangkok');
      expect(surveyListItem1).toHaveTextContent('ibis Bangkok Riverside');

      await polly.stop();
    });

    it('renders the background image based on the selected survey', async () => {
      const polly = setupPolly('list_survey_success');

      render(<SurveyList />);

      await waitFor(() => {
        const carousel = screen.getByTestId(surveyListTestIds.carousel);

        expect(carousel).toBeVisible();
      });

      const backgroundImageComp = screen.getByTestId(surveyListTestIds.backgroundImage);
      const backgroundImage = within(backgroundImageComp).getByRole('img');
      const carouselIndicators = screen.getAllByTestId(carouselTestIds.carouselIndicator);

      expect(backgroundImage).toBeVisible();
      expect(backgroundImage).toHaveAttribute('src', 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_');

      carouselIndicators[1].click();

      await waitFor(() => {
        expect(backgroundImage).toHaveAttribute('src', 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_');
      });

      await polly.stop();
    });
  });

  describe('given there is NO survey', () => {
    it('renders the blank state', async () => {
      const polly = setupPolly('list_survey_success_empty');

      render(<SurveyList />);

      await waitFor(() => {
        screen.getByTestId(surveyListTestIds.blankState);
      });

      const blankState = screen.getByTestId(surveyListTestIds.blankState);

      expect(blankState).toBeVisible();
      expect(blankState).toHaveTextContent('😎');
      expect(blankState).toHaveTextContent('survey:completed');

      await polly.stop();
    });
  });
});
