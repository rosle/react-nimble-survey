import React from 'react';

import { render, screen } from '@testing-library/react';

import SurveyList, { surveyListTestIds } from '.';

describe('SurveyList', () => {
  it('renders the blank state', () => {
    render(<SurveyList />);

    const blankState = screen.getByTestId(surveyListTestIds.blankState);

    expect(blankState).toBeVisible();
    expect(blankState).toHaveTextContent('😎');
    expect(blankState).toHaveTextContent('survey:completed');
  });
});
