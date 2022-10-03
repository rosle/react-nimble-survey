import React, { useEffect, useRef } from 'react';

import { Carousel as BootstrapCarousel } from 'bootstrap';
import classNames from 'classnames';

export const carouselTestIds = {
  carousel: 'carousel',
  carouselIndicator: 'carousel-indicator',
  carouselItem: 'carousel-item',
};

export interface CarouselProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  items: T[];
}

const Carousel = <T extends React.ReactNode>({ id, items, ...props }: CarouselProps<T>) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current === null) return;

    new BootstrapCarousel(carouselRef.current);
  }, []);

  const CarouselIndicator = ({ index }: { index: number }) => {
    const indicatorClasses = classNames({ active: index === 0 });

    return (
      <button
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide-to={index}
        className={indicatorClasses}
        data-test-id={carouselTestIds.carouselIndicator}
      ></button>
    );
  };

  return (
    <div id={id} className="carousel slide" {...props} ref={carouselRef} data-test-id={carouselTestIds.carousel}>
      <div className="carousel-indicators">
        {items.map((_item, index) => (
          <CarouselIndicator index={index} key={index} />
        ))}
      </div>
      <div className="carousel-inner">
        {items.map((item, index) => {
          const itemClasses = classNames('carousel-item', { active: index === 0 });

          return (
            <div className={itemClasses} key={index} data-test-id={carouselTestIds.carouselItem}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
