import React from 'react';

import { buildSurveyDetail } from 'tests/factories/survey';

import SurveyIntro, { surveyIntroTestIds } from '.';

describe('SurveyIntro', () => {
  it('displays the survey intro cover image', () => {
    const surveyDetail = buildSurveyDetail();

    cy.mount(<SurveyIntro surveyDetail={surveyDetail} />);

    cy.findByTestId(surveyIntroTestIds.cover)
      .should('be.visible')
      .should('have.attr', 'src', surveyDetail.intro.coverImageUrlLarge);
  });

  it('displays the survey title', () => {
    const surveyDetail = buildSurveyDetail();

    cy.mount(<SurveyIntro surveyDetail={surveyDetail} />);

    cy.findByTestId(surveyIntroTestIds.title).should('be.visible').should('have.text', surveyDetail.survey.title);
  });

  it('displays the survey intro description', () => {
    const surveyDetail = buildSurveyDetail();

    cy.mount(<SurveyIntro surveyDetail={surveyDetail} />);

    cy.findByTestId(surveyIntroTestIds.description).should('be.visible').should('have.text', surveyDetail.intro.text);
  });

  it('displays the start survey button', () => {
    const surveyDetail = buildSurveyDetail();

    cy.mount(<SurveyIntro surveyDetail={surveyDetail} />);

    cy.findByTestId(surveyIntroTestIds.startButton).should('be.visible');
  });
});
