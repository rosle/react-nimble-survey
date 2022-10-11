import React from 'react';

import { buildSurvey, buildSurveyQuestionIntro } from 'tests/factories/survey';

import SurveyIntro, { surveyIntroTestIds } from '.';

describe('SurveyIntro', () => {
  it('displays the survey intro cover image', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    cy.mount(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={cy.stub()} />);

    cy.findByTestId(surveyIntroTestIds.cover).should('be.visible').should('have.attr', 'src', surveyIntro.coverImageUrl);
  });

  it('displays the survey title', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    cy.mount(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={cy.stub()} />);

    cy.findByTestId(surveyIntroTestIds.title).should('be.visible').should('have.text', survey.title);
  });

  it('displays the survey intro description', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    cy.mount(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={cy.stub()} />);

    cy.findByTestId(surveyIntroTestIds.description).should('be.visible').should('have.text', surveyIntro.text);
  });

  it('displays the start survey button', () => {
    const survey = buildSurvey();
    const surveyIntro = buildSurveyQuestionIntro();

    cy.mount(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={cy.stub()} />);

    cy.findByTestId(surveyIntroTestIds.startButton).should('be.visible');
  });

  describe('given the user clicks on the start survey button', () => {
    it('triggers onStart function', () => {
      const survey = buildSurvey();
      const surveyIntro = buildSurveyQuestionIntro();
      const mockOnStartFn = cy.stub().as('onStart');

      cy.mount(<SurveyIntro survey={survey} surveyIntro={surveyIntro} onStart={mockOnStartFn} />);

      cy.findByTestId(surveyIntroTestIds.startButton).click();

      cy.get('@onStart').should('have.been.calledOnce');
    });
  });
});
