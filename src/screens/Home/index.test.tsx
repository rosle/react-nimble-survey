import React from 'react';

import { screen, waitFor } from '@testing-library/react';

import { surveyListTestIds } from 'components/SurveyList';
import { renderWithRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    renderWithRouter(<HomeScreen />);

    const todayDate = screen.getByTestId(homeScreenTestIds.todayDate);

    expect(todayDate).toBeVisible();
  });

  describe('given there are surveys', () => {
    it('renders the survey list carousel', async () => {
      const polly = setupPolly('list_survey_success');

      renderWithRouter(<HomeScreen />);

      await waitFor(() => {
        const surveyList = screen.getByTestId(homeScreenTestIds.surveyList);

        expect(surveyList).toBeVisible();
      });

      const surveyListCarousel = screen.getByTestId(surveyListTestIds.carousel);

      expect(surveyListCarousel).toBeVisible();

      await polly.stop();
    });
  });

  describe('given there is NO survey', () => {
    it('renders the survey list blank state', async () => {
      const polly = setupPolly('list_survey_success_empty');

      renderWithRouter(<HomeScreen />);

      await waitFor(() => {
        const surveyList = screen.getByTestId(homeScreenTestIds.surveyList);

        expect(surveyList).toBeVisible();
      });

      const surveyListBlankState = screen.getByTestId(surveyListTestIds.blankState);

      expect(surveyListBlankState).toBeVisible();

      await polly.stop();
    });
  });
});
