import React, { useCallback, useEffect, useRef } from 'react';

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
  onItemChanged?: (index: number) => void;
}

const Carousel = <T extends React.ReactNode>({ id, className, items, onItemChanged, ...props }: CarouselProps<T>) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const onCarouselSlid = useCallback(() => {
    const carouselEl = carouselRef.current;

    if (!carouselEl) return;

    const activeItem = carouselEl.querySelector('.carousel-item.active') as HTMLElement;
    const activeItemIndex: number = parseInt(activeItem.dataset.index as string);

    onItemChanged && onItemChanged(activeItemIndex);
  }, [onItemChanged]);

  useEffect(() => {
    const carouselEl = carouselRef.current;

    if (!carouselEl) return;

    new BootstrapCarousel(carouselEl);

    carouselEl.addEventListener('slid.bs.carousel', onCarouselSlid);

    return () => {
      carouselEl.removeEventListener('slid.bs.carousel', onCarouselSlid);
    };
  }, [onCarouselSlid]);

  const classes = classNames('carousel', 'slide', className);

  return (
    <div id={id} className={classes} ref={carouselRef} data-test-id={carouselTestIds.carousel} {...props}>
      <div className="carousel-indicators">
        {items.map((_item, index) => {
          const indicatorClasses = classNames({ active: index === 0 });

          return (
            <button
              type="button"
              key={index}
              data-bs-target={`#${id}`}
              data-bs-slide-to={index}
              className={indicatorClasses}
              data-test-id={carouselTestIds.carouselIndicator}
            ></button>
          );
        })}
      </div>
      <div className="carousel-inner">
        {items.map((item, index) => {
          const itemClasses = classNames('carousel-item', { active: index === 0 });

          return (
            <div className={itemClasses} key={index} data-index={index} data-test-id={carouselTestIds.carouselItem}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
