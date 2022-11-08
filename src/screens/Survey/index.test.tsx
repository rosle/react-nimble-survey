import React from 'react';
import Router from 'react-router-dom';

import { screen, waitFor } from '@testing-library/react';

import routePath from 'routes/routePath';
import { renderWithRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import SurveyScreen, { surveyScreenTestIds } from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('SurveyScreen', () => {
  it('displays the back navigation to the Home page', () => {
    const surveyId = 'd5de6a8f8f5f1cfe51bc';
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: surveyId });

    renderWithRouter(<SurveyScreen />);

    const backNavigation = screen.getByTestId(surveyScreenTestIds.backNavigation);

    expect(backNavigation).toBeVisible();
    expect(backNavigation).toHaveAttribute('href', routePath.index);
  });

  it('displays the survey intro', async () => {
    const polly = setupPolly('get_survey_success');

    const surveyId = 'd5de6a8f8f5f1cfe51bc';
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: surveyId });

    renderWithRouter(<SurveyScreen />);

    await waitFor(() => {
      const surveyIntro = screen.getByTestId(surveyScreenTestIds.surveyIntro);

      expect(surveyIntro).toBeVisible();
    });

    await polly.stop();
  });
});
