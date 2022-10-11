import React from 'react';

import FullScreenLayout from '.';

describe('FullScreenLayout', () => {
  it('adds the html class', () => {
    cy.mount(<FullScreenLayout />);

    cy.get('html').should('have.class', 'layout-fullscreen');
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    cy.mount(
      <FullScreenLayout>
        <p>{childrenContent}</p>
      </FullScreenLayout>
    );

    cy.contains(childrenContent).should('be.visible');
  });

  describe('given the top navigation props', () => {
    it('renders the given top navigation element', () => {
      const topNavigationContent = 'Title';

      cy.mount(<FullScreenLayout topNavigation={<h1>{topNavigationContent}</h1>} />);

      cy.contains(topNavigationContent).should('be.visible');
    });
  });
});
