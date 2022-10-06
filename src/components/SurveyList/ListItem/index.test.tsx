import React from 'react';

import { render, screen, within } from '@testing-library/react';

import { caretRightTestId } from 'components/Icon/CaretRight';
import { buildSurvey } from 'tests/factories/survey';

import ListItem, { listItemTestIds } from '.';

describe('ListItem', () => {
  it('displays the survey cover image', () => {
    const survey = buildSurvey();

    render(<ListItem survey={survey} onSelected={jest.fn()} />);

    const surveyCoverImage = screen.getByTestId(listItemTestIds.cover);

    expect(surveyCoverImage).toBeVisible();
    expect(surveyCoverImage).toHaveAttribute('src', survey.coverImageUrl);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();

    render(<ListItem survey={survey} onSelected={jest.fn()} />);

    const surveyTitle = screen.getByTestId(listItemTestIds.title);

    expect(surveyTitle).toBeVisible();
    expect(surveyTitle).toHaveTextContent(survey.title);
  });

  it('displays the survey description', () => {
    const survey = buildSurvey();

    render(<ListItem survey={survey} onSelected={jest.fn()} />);

    const surveyDescription = screen.getByTestId(listItemTestIds.description);

    expect(surveyDescription).toBeVisible();
    expect(surveyDescription).toHaveTextContent(survey.description);
  });

  it('displays the view survey button', () => {
    const survey = buildSurvey();

    render(<ListItem survey={survey} onSelected={jest.fn()} />);

    const viewSurveyButton = screen.getByTestId(listItemTestIds.viewButton);
    const viewSurveyButtonIcon = within(viewSurveyButton).getByTestId(caretRightTestId);

    expect(viewSurveyButton).toBeVisible();
    expect(viewSurveyButtonIcon).toBeVisible();
  });

  describe('given the user clicks on the view survey button', () => {
    it('triggers onSelected function with the survey info', () => {
      const survey = buildSurvey();
      const mockOnSelectedFn = jest.fn();

      render(<ListItem survey={survey} onSelected={mockOnSelectedFn} />);

      const viewSurveyButton = screen.getByTestId(listItemTestIds.viewButton);

      viewSurveyButton.click();

      expect(mockOnSelectedFn).toHaveBeenCalledTimes(1);
      expect(mockOnSelectedFn).toHaveBeenCalledWith(survey);
    });
  });
});
