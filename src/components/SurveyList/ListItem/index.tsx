import React from 'react';

import Button from 'components/Button';
import CaretRightIcon from 'components/Icon/CaretRight';
import { Survey } from 'types/survey';

export const listItemTestIds = {
  listItem: 'list-survey-item',
  cover: 'list-survey-item__cover',
  title: 'list-survey-item__title',
  description: 'list-survey-item__description',
  viewButton: 'list-survey-item__action--view',
};

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  survey: Survey;
  onSelected: (survey: Survey) => void;
}

const ListItem = ({ survey, onSelected }: ListItemProps) => {
  return (
    <div className="list-survey-item" data-test-id={listItemTestIds.listItem}>
      <img
        className="list-survey-item__cover"
        src={survey.coverImageUrl}
        alt="survey cover"
        data-test-id={listItemTestIds.cover}
      />
      <div className="list-survey-item__detail">
        <div>
          <h3 className="list-survey-item__title" data-test-id={listItemTestIds.title}>
            {survey.title}
          </h3>
          <div className="list-survey-item__description" data-test-id={listItemTestIds.description}>
            {survey.description}
          </div>
        </div>
        <Button
          className="list-survey-item__action list-survey-item__action--view"
          round
          onClick={() => onSelected(survey)}
          data-test-id={listItemTestIds.viewButton}
        >
          <CaretRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
