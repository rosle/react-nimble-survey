import { generatePath } from 'react-router-dom';

import routePath from 'routes/routePath';

const viewSurveysTestIds = {
  surveyIntro: 'survey__survey-intro',
};

describe('View Survey', () => {
  it('displays the survey intro', () => {
    const surveyId = 'd5de6a8f8f5f1cfe51bc'

    cy.intercept('GET', `/api/v1/surveys/${surveyId}`, { statusCode: 200, fixture: 'get_survey_success' });

    cy.login();
    cy.visit(generatePath(routePath.survey, { id: surveyId }));

    cy.findByTestId(viewSurveysTestIds.surveyIntro)
      .should('be.visible')
      .should('contain.text', 'Scarlett Bangkok')
      .should('contain.text', '\nThank you for visiting Scarlett!\n Please take a moment to share your feedback.')
      .findByRole('img')
      .should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l');
  });
});
