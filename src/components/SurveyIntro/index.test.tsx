import React from 'react';

import { render, screen } from '@testing-library/react';

import { buildSurveyDetail } from 'tests/factories/survey';

import SurveyIntro, { surveyIntroTestIds } from '.';

describe('SurveyIntro', () => {
  it('displays the survey intro cover image', () => {
    const surveyDetail = buildSurveyDetail();

    render(<SurveyIntro surveyDetail={surveyDetail} />);

    const introCoverImage = screen.getByTestId(surveyIntroTestIds.cover);

    expect(introCoverImage).toBeVisible();
    expect(introCoverImage).toHaveAttribute('src', surveyDetail.intro.coverImageUrlLarge);
  });

  it('displays the survey title', () => {
    const surveyDetail = buildSurveyDetail();

    render(<SurveyIntro surveyDetail={surveyDetail} />);

    const introTitle = screen.getByTestId(surveyIntroTestIds.title);

    expect(introTitle).toBeVisible();
    expect(introTitle).toHaveTextContent(surveyDetail.survey.title);
  });

  it('displays the survey intro description', () => {
    const surveyDetail = buildSurveyDetail();

    render(<SurveyIntro surveyDetail={surveyDetail} />);

    const introDescription = screen.getByTestId(surveyIntroTestIds.description);

    expect(introDescription).toBeVisible();
    expect(introDescription).toHaveTextContent(surveyDetail.intro.text);
  });

  it('displays the start survey button', () => {
    const surveyDetail = buildSurveyDetail();

    render(<SurveyIntro surveyDetail={surveyDetail} />);

    const startSurveyButton = screen.getByTestId(surveyIntroTestIds.startButton);

    expect(startSurveyButton).toBeVisible();
  });
});
