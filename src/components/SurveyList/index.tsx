import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import BackgroundImage from 'components/BackgroundImage';
import BlankState from 'components/BlankState';
import Carousel from 'components/Carousel';
import { Survey } from 'types/survey';

import ListItem from './ListItem';
import LoadingListItem from './LoadingListItem';

export const surveyListTestIds = {
  blankState: 'list-survey__blank-state',
  carousel: 'list-survey__carousel',
  backgroundImage: 'list-survey__background-image',
};

export interface SurveyListProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  surveys: Survey[];
}

const SurveyList = ({ className, isLoading, surveys, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey']);
  const [currentSurvey, setCurrentSurvey] = useState<Nullable<Survey>>(null);

  const handleSurveyChanged = useCallback(
    (index: number) => {
      setCurrentSurvey(surveys[index]);
    },
    [surveys]
  );

  useEffect(() => {
    if (!isLoading && surveys) {
      setCurrentSurvey(surveys[0]);
    }
  }, [isLoading, surveys]);

  if (isLoading) {
    return <LoadingListItem />
  } else {
    return (
      <div className={classNames('list-survey', className)} {...props}>
        {surveys.length === 0 ? (
          <BlankState
            className="list-survey__blank-state"
            emoji="😎"
            description={t('survey:completed')}
            data-test-id={surveyListTestIds.blankState}
          />
        ) : (
          <>
            {currentSurvey && (
              <BackgroundImage imageUrl={currentSurvey.coverImageUrl} data-test-id={surveyListTestIds.backgroundImage} />
            )}
            <Carousel
              id="surveyListCarousel"
              className="list-survey__carousel"
              items={surveys.map((survey) => (
                <ListItem key={survey.id} survey={survey} />
              ))}
              onItemChanged={handleSurveyChanged}
              data-test-id={surveyListTestIds.carousel}
            />
          </>
        )}
      </div>
    );
  }
};

export default SurveyList;
