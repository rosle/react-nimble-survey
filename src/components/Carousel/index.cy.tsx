import React from 'react';

import Carousel, { carouselTestIds } from '.';

describe('Carousel', () => {
  it('displays the carousel', () => {
    const id = 'myCarousel';

    cy.mount(<Carousel id={id} items={[]} />);

    cy.findByTestId(carouselTestIds.carousel).should('exist').should('have.attr', 'id', id);
  });

  it('displays the carousel indicators', () => {
    const id = 'myCarousel';
    const items = ['Slide 1', 'Slide 2'];

    cy.mount(<Carousel id={id} items={items} />);

    cy.findAllByTestId(carouselTestIds.carouselIndicator).as('carouselIndicators').should('have.length', items.length);

    cy.get('@carouselIndicators')
      .eq(0)
      .should('have.attr', 'data-bs-target', `#${id}`)
      .should('have.attr', 'data-bs-slide-to', 0);

    cy.get('@carouselIndicators')
      .eq(1)
      .should('have.attr', 'data-bs-target', `#${id}`)
      .should('have.attr', 'data-bs-slide-to', 1);
  });

  it('displays the carousel items', () => {
    const items = ['Slide 1', 'Slide 2'];

    cy.mount(<Carousel id="myCarousel" items={items} />);

    cy.findAllByTestId(carouselTestIds.carouselItem).as('carouselItems').should('have.length', items.length);

    cy.get('@carouselItems').eq(0).should('have.class', 'active').should('have.text', items[0]);
    cy.get('@carouselItems').eq(1).should('not.have.class', 'active').should('have.text', items[1]);
  });

  context('given the user clicks on the carousel indicator', () => {
    it('goes to the correct carousel items', () => {
      const items = ['Slide 1', 'Slide 2', 'Slide 3'];

      cy.mount(<Carousel id="myCarousel" items={items} />);

      cy.findAllByTestId(carouselTestIds.carouselIndicator).as('carouselIndicators');
      cy.findAllByTestId(carouselTestIds.carouselItem).as('carouselItems');

      cy.get('@carouselItems').eq(0).should('have.class', 'active');
      cy.get('@carouselItems').eq(1).should('not.have.class', 'active');
      cy.get('@carouselItems').eq(2).should('not.have.class', 'active');

      cy.get('@carouselIndicators').eq(1).click();

      cy.get('@carouselItems').eq(0).should('not.have.class', 'active');
      cy.get('@carouselItems').eq(1).should('have.class', 'active');
      cy.get('@carouselItems').eq(2).should('not.have.class', 'active');

      cy.get('@carouselIndicators').eq(2).click();

      cy.get('@carouselItems').eq(0).should('not.have.class', 'active');
      cy.get('@carouselItems').eq(1).should('not.have.class', 'active');
      cy.get('@carouselItems').eq(2).should('have.class', 'active');
    });
  });
});
