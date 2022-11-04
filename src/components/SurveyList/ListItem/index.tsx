import React from 'react';
import { Link } from 'react-router-dom';

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
}

const ListItem = ({ survey }: ListItemProps) => {
  return (
    <div className="list-survey-item" data-test-id={listItemTestIds.listItem}>
      <img
        className="list-survey-item__cover"
        src={survey.coverImageUrlLarge}
        alt="survey cover"
        data-test-id={listItemTestIds.cover}
      />
      <div className="list-survey-item__detail">
        <div>
          <h3 className="list-survey-item__title" data-test-id={listItemTestIds.title}>
            {survey.title}
          </h3>
          <span className="list-survey-item__description" data-test-id={listItemTestIds.description}>
            {survey.description}
          </span>
        </div>
        {/* TODO: Update to use route path constant after rebased */}
        <Link to={`/surveys/${survey.id}`} data-test-id={listItemTestIds.viewButton}>
          <Button className="list-survey-item__action list-survey-item__action--view" round>
            <CaretRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ListItem;
