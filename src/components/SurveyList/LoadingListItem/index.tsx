import React from 'react';

import Button from 'components/Button';
import CaretRightIcon from 'components/Icon/CaretRight';

export type ListItemProps = React.HTMLAttributes<HTMLDivElement>;

const LoadingListItem = ({}: ListItemProps) => {
  return (
    <div className="list-survey-item list-survey-item--loading">
      <div className="list-survey-item__cover" />
      <div className="list-survey-item__detail">
        <div>
          <h3 className="list-survey-item__title">Loading Survey Title</h3>
          <span className="list-survey-item__description">Loading Description</span>
        </div>
        <Button className="list-survey-item__action list-survey-item__action--view" round>
          <CaretRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default LoadingListItem;
