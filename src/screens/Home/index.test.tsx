import React from 'react';

import { screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    renderWithRouter(<HomeScreen />);

    const todayDate = screen.getByTestId(homeScreenTestIds.todayDate);

    expect(todayDate).toBeVisible();
  });

  it('renders the survey list', async () => {
    const polly = setupPolly('list_survey_success');

    renderWithRouter(<HomeScreen />);

    await waitFor(() => {
      const surveyList = screen.getByTestId(homeScreenTestIds.surveyList);

      expect(surveyList).toBeVisible();
    });

    await polly.stop();
  });
});
