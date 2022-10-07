import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import SurveyAdapter from 'adapters/Survey';
import BackgroundImage from 'components/BackgroundImage';
import BlankState from 'components/BlankState';
import Carousel from 'components/Carousel';
import Serializer from 'lib/serializers';
import { Survey } from 'types/survey';

import ListItem from './ListItem';

export const surveyListTestIds = {
  blankState: 'list-survey__blank-state',
  carousel: 'list-survey__carousel',
  backgroundImage: 'list-survey__background-image',
};

// TODO: Later remove blank prop after fetching response from API on #19
export interface SurveyListProps extends React.HTMLAttributes<HTMLDivElement> {
  blank?: boolean;
}

const SurveyList = ({ blank = false, className, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<Nullable<Survey>>(null);

  const handleSurveyChanged = (index: number) => {
    setCurrentSurvey(surveys[index]);
  };

  /* istanbul ignore next: Will be handled after connected to the API on #21 */
  const handleSurveySelected = (survey: Survey) => {
    console.info(`Selected Survey ID ${survey.id}`);
  };

  const fetchSurveyList = useCallback(async () => {
    setIsLoading(true);

    const data = await SurveyAdapter.list();
    const surveys: Survey[] = Serializer.deserialize('survey', data);

    setSurveys(surveys);
    setCurrentSurvey(surveys[0]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSurveyList();
  }, []);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className={classNames('list-survey', className)} {...props}>
        {surveys.length == 0 ? (
          <BlankState
            className="list-survey__blank-state"
            emoji="😎"
            description={t('survey:completed')}
            data-test-id={surveyListTestIds.blankState}
          />
        ) : (
          <>
            <BackgroundImage imageUrl={currentSurvey!.coverImageUrl} data-test-id={surveyListTestIds.backgroundImage} />
            <Carousel
              id="surveyListCarousel"
              className="list-survey__carousel"
              items={surveys.map((survey) => (
                <ListItem key={survey.id} survey={survey} onSelected={handleSurveySelected} />
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
