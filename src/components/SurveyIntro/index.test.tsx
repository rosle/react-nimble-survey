import React from 'react';

import { render, screen } from '@testing-library/react';

import { buildSurvey, buildSurveyQuestionIntro } from 'tests/factories/survey';

import SurveyIntro, { surveyIntroTestIds } from '.';

describe('SurveyIntro', () => {
  it('displays the survey intro cover image', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={jest.fn()} />);

    const introCoverImage = screen.getByTestId(surveyIntroTestIds.cover);

    expect(introCoverImage).toBeVisible();
    expect(introCoverImage).toHaveAttribute('src', surveyIntro.coverImageUrl);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={jest.fn()} />);

    const introTitle = screen.getByTestId(surveyIntroTestIds.title);

    expect(introTitle).toBeVisible();
    expect(introTitle).toHaveTextContent(survey.title);
  });

  it('displays the survey intro description', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={jest.fn()} />);

    const introDescription = screen.getByTestId(surveyIntroTestIds.description);

    expect(introDescription).toBeVisible();
    expect(introDescription).toHaveTextContent(surveyIntro.text);
  });

  it('displays the start survey button', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={jest.fn()} />);

    const startSurveyButton = screen.getByTestId(surveyIntroTestIds.startButton);

    expect(startSurveyButton).toBeVisible();
  });

  describe('given the user clicks on the start survey button', () => {
    it('triggers onStart function', () => {
      const survey = buildSurvey();
      const surveyIntro = buildSurveyQuestionIntro();
      const mockOnStartFn = jest.fn();

      render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={mockOnStartFn} />);

      const startSurveyButton = screen.getByTestId(surveyIntroTestIds.startButton);

      startSurveyButton.click();

      expect(mockOnStartFn).toHaveBeenCalledTimes(1);
    });
  });
});
