import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithRouter } from 'tests/renderWithRouter';

import HomeScreen, { homeScreenTestIds } from '.';

describe('HomeScreen', () => {
  it("renders today's date", () => {
    renderWithRouter(<HomeScreen />);

    const todayDate = screen.getByTestId(homeScreenTestIds.todayDate);

    expect(todayDate).toBeVisible();
  });

  it('renders the survey list', () => {
    renderWithRouter(<HomeScreen />);

    const surveyList = screen.getByTestId(homeScreenTestIds.surveyList);

    expect(surveyList).toBeVisible();
  });
});
