import React from 'react';

import { faker } from '@faker-js/faker';

import BackgroundImage, { backgroundImageTestIds } from '.';

describe('BackgroundImage', () => {
  it('displays the given image url', () => {
    const imageUrl = faker.image.imageUrl();

    cy.mount(<BackgroundImage imageUrl={imageUrl} />);

    cy.findByTestId(backgroundImageTestIds.backgroundImage)
      .should('be.visible')
      .findByRole('img')
      .should('have.attr', 'src', imageUrl);
  });
});
