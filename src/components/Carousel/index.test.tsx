import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import Carousel, { carouselTestIds } from '.';

describe('Carousel', () => {
  it('displays the carousel', () => {
    const id = 'myCarousel';

    render(<Carousel id={id} items={[]} />);

    const carousel = screen.getByTestId(carouselTestIds.carousel);

    expect(carousel).toBeVisible();
    expect(carousel).toHaveAttribute('id', id);
  });

  it('displays the carousel indicators', () => {
    const id = 'myCarousel';
    const items = ['Slide 1', 'Slide 2'];

    render(<Carousel id={id} items={items} />);

    const carouselIndicators = screen.getAllByTestId(carouselTestIds.carouselIndicator);

    expect(carouselIndicators).toHaveLength(items.length);

    expect(carouselIndicators[0]).toHaveAttribute('data-bs-target', `#${id}`);
    expect(carouselIndicators[0]).toHaveAttribute('data-bs-slide-to', '0');

    expect(carouselIndicators[1]).toHaveAttribute('data-bs-target', `#${id}`);
    expect(carouselIndicators[1]).toHaveAttribute('data-bs-slide-to', '1');
  });

  it('displays the carousel items', () => {
    const items = ['Slide 1', 'Slide 2'];

    render(<Carousel id="myCarousel" items={items} />);

    const carouselItems = screen.getAllByTestId(carouselTestIds.carouselItem);

    expect(carouselItems).toHaveLength(items.length);

    expect(carouselItems[0]).toHaveClass('active');
    expect(carouselItems[0]).toHaveTextContent(items[0]);

    expect(carouselItems[1]).not.toHaveClass('active');
    expect(carouselItems[1]).toHaveTextContent(items[1]);
  });

  // Need to disable the rule to wait for the animation to be completely ended.
  /* eslint-disable testing-library/no-wait-for-multiple-assertions */
  describe('given the user clicks on the carousel indicator', () => {
    it('goes to the correct carousel items', async () => {
      const items = ['Slide 1', 'Slide 2', 'Slide 3'];

      render(<Carousel id="myCarousel" items={items} />);

      const carouselIndicators = screen.getAllByTestId(carouselTestIds.carouselIndicator);
      const carouselItems = screen.getAllByTestId(carouselTestIds.carouselItem);

      expect(carouselItems[0]).toHaveClass('active');
      expect(carouselItems[1]).not.toHaveClass('active');
      expect(carouselItems[2]).not.toHaveClass('active');

      carouselIndicators[1].click();

      await waitFor(() => {
        expect(carouselItems[0]).not.toHaveClass('active');
        expect(carouselItems[1]).toHaveClass('active');
        expect(carouselItems[2]).not.toHaveClass('active');
      });

      carouselIndicators[2].click();

      await waitFor(() => {
        expect(carouselItems[0]).not.toHaveClass('active');
        expect(carouselItems[1]).not.toHaveClass('active');
        expect(carouselItems[2]).toHaveClass('active');
      });
    });
  });
  /* eslint-enable */
});
