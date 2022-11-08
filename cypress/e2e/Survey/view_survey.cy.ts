import { generatePath } from 'react-router-dom';

import routePath from 'routes/routePath';

const viewSurveysTestIds = {
  surveyIntro: 'survey__survey-intro',
};

describe('View Survey', () => {
  it('displays the survey intro', () => {
    cy.intercept('GET', '/api/v1/surveys', { statusCode: 200, fixture: 'list_survey_success' });

    cy.login();
    cy.visit(generatePath(routePath.survey, { id: '1' }));

    cy.findByTestId(viewSurveysTestIds.surveyIntro)
      .should('be.visible')
      .should('contain.text', "Let's Chick")
      .should('contain.text', 'Thank you for visiting us!')
      .findByRole('img')
      .should('have.attr', 'src', 'https://dhdbhh0jsld0o.cloudfront.net/m/6ea42840403875928db3_l');
  });
});
