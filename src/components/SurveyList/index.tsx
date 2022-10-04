import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import BlankState from 'components/BlankState';
import Carousel from 'components/Carousel';
import { Survey } from 'types/survey';

import { mockSurveyList } from './data';
import ListItem from './ListItem';

export const surveyListTestIds = {
  blankState: 'list-survey__blank-state',
  carousel: 'list-survey__carousel',
};

// TODO: Later remove blank prop after fetching response from API on #19
export interface SurveyListProps extends React.HTMLAttributes<HTMLDivElement> {
  blank?: boolean;
}

const SurveyList = ({ blank = false, className, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey']);

  const handleSurveySelected = (survey: Survey) => {
    console.info(`Selected Survey ID ${survey.id}`);
  };

  const surveyListItems = mockSurveyList.map((survey) => (
    <ListItem key={survey.id} survey={survey} onSelected={handleSurveySelected} />
  ));

  return (
    <div className={classNames('list-survey', className)} {...props}>
      {blank ? (
        <BlankState
          className="list-survey__blank-state"
          emoji="😎"
          description={t('survey:completed')}
          data-test-id={surveyListTestIds.blankState}
        />
      ) : (
        <Carousel
          id="surveyListCarousel"
          className="list-survey__carousel"
          items={surveyListItems}
          data-test-id={surveyListTestIds.carousel}
        />
      )}
    </div>
  );
};

export default SurveyList;
