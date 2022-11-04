import React from 'react';

import { render, screen } from '@testing-library/react';

import { buildSurvey, buildSurveyQuestionIntro } from 'tests/factories/survey';

import SurveyIntro, { surveyIntroTestIds } from '.';

describe('SurveyIntro', () => {
  it('displays the survey intro cover image', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} />);

    const introCoverImage = screen.getByTestId(surveyIntroTestIds.cover);

    expect(introCoverImage).toBeVisible();
    expect(introCoverImage).toHaveAttribute('src', surveyIntro.coverImageUrl);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} />);

    const introTitle = screen.getByTestId(surveyIntroTestIds.title);

    expect(introTitle).toBeVisible();
    expect(introTitle).toHaveTextContent(survey.title);
  });

  it('displays the survey intro description', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} />);

    const introDescription = screen.getByTestId(surveyIntroTestIds.description);

    expect(introDescription).toBeVisible();
    expect(introDescription).toHaveTextContent(surveyIntro.text);
  });

  it('displays the start survey button', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    render(<SurveyIntro survey={survey} surveyIntro={surveyIntro} />);

    const startSurveyButton = screen.getByTestId(surveyIntroTestIds.startButton);

    expect(startSurveyButton).toBeVisible();
  });
});
