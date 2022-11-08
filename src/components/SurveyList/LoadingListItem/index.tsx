import React from 'react';

import Button from 'components/Button';
import CaretRightIcon from 'components/Icon/CaretRight';

export const loadingListItemTestIds = {
  loadingListItem: 'list-survey-item--loading',
};

export type LoadingListItemProps = React.HTMLAttributes<HTMLDivElement>;

const LoadingListItem = ({ ...props }: LoadingListItemProps) => {
  return (
    <div className="list-survey-item list-survey-item--loading" data-test-id={loadingListItemTestIds.loadingListItem} {...props}>
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
