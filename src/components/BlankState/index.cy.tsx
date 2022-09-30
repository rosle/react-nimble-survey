import React from 'react';

import { faker } from '@faker-js/faker';

import BlankState, { blankStateTestIds } from '.';

describe('BlankState', () => {
  it('displays the given emoji', () => {
    const emojiContent = '💛';

    cy.mount(<BlankState emoji={emojiContent} description={faker.lorem.sentence()} />);

    cy.findByTestId(blankStateTestIds.emoji).should('be.visible').should('contain.text', emojiContent);
  });

  it('displays the given description', () => {
    const descriptionContent = faker.lorem.sentence();

    cy.mount(<BlankState emoji="🥳" description={descriptionContent} />);

    cy.findByTestId(blankStateTestIds.description).should('be.visible').should('contain.text', descriptionContent);
  });
});
