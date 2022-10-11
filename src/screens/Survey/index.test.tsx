import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithRouter } from 'tests/renderWithRouter';

import SurveyScreen, { surveyScreenTestIds } from '.';

describe('SurveyScreen', () => {
  it('displays the back navigation to the Home page', () => {
    renderWithRouter(<SurveyScreen />);

    const backNavigation = screen.getByTestId(surveyScreenTestIds.backNavigation);

    expect(backNavigation).toBeVisible();
    expect(backNavigation).toHaveAttribute('href', '/');
  });

  it('displays the survey intro', () => {
    renderWithRouter(<SurveyScreen />);

    const surveyIntro = screen.getByTestId(surveyScreenTestIds.surveyIntro);

    expect(surveyIntro).toBeVisible();
  });
});
