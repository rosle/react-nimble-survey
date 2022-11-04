import React from 'react';

import { screen, within } from '@testing-library/react';

import { caretRightTestId } from 'components/Icon/CaretRight';
import { buildSurvey } from 'tests/factories/survey';
import { renderWithRouter } from 'tests/renderWithRouter';

import ListItem, { listItemTestIds } from '.';

describe('ListItem', () => {
  it('displays the high resolution survey cover image', () => {
    const survey = buildSurvey();

    renderWithRouter(<ListItem survey={survey} />);

    const surveyCoverImage = screen.getByTestId(listItemTestIds.cover);

    expect(surveyCoverImage).toBeVisible();
    expect(surveyCoverImage).toHaveAttribute('src', survey.coverImageUrlLarge);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();

    renderWithRouter(<ListItem survey={survey} />);

    const surveyTitle = screen.getByTestId(listItemTestIds.title);

    expect(surveyTitle).toBeVisible();
    expect(surveyTitle).toHaveTextContent(survey.title);
  });

  it('displays the survey description', () => {
    const survey = buildSurvey();

    renderWithRouter(<ListItem survey={survey} />);

    const surveyDescription = screen.getByTestId(listItemTestIds.description);

    expect(surveyDescription).toBeVisible();
    expect(surveyDescription).toHaveTextContent(survey.description);
  });

  it('displays the button link to view the survey', () => {
    const survey = buildSurvey();

    renderWithRouter(<ListItem survey={survey} />);

    const viewSurveyButton = screen.getByTestId(listItemTestIds.viewButton);
    const viewSurveyButtonIcon = within(viewSurveyButton).getByTestId(caretRightTestId);

    expect(viewSurveyButton).toBeVisible();
    expect(viewSurveyButton).toHaveAttribute('href', `/surveys/${survey.id}`);
    expect(viewSurveyButtonIcon).toBeVisible();
  });
});
