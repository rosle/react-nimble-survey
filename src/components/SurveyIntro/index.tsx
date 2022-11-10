import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import Button from 'components/Button';
import { SurveyDetail } from 'types/survey';

export const surveyIntroTestIds = {
  cover: 'survey-intro__cover',
  title: 'survey-intro__title',
  description: 'survey-intro__description',
  startButton: 'survey-intro__action--start',
};

export interface SurveyIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  surveyDetail: SurveyDetail;
}

const SurveyIntro = ({ surveyDetail, className, ...props }: SurveyIntroProps) => {
  const { t } = useTranslation(['survey']);

  const { survey, intro } = surveyDetail;

  return (
    <div className={classNames('survey-intro', className)} {...props}>
      <img
        className="survey-intro__cover"
        src={intro.coverImageUrlLarge}
        alt="survey cover"
        data-test-id={surveyIntroTestIds.cover}
      />
      <h1 className="survey-intro__title" data-test-id={surveyIntroTestIds.title}>
        {survey.title}
      </h1>
      <div className="survey-intro__description" data-test-id={surveyIntroTestIds.description}>
        {intro.text}
      </div>
      <Button
        className="survey-intro__action survey-intro__action--start"
        fullWidth
        data-test-id={surveyIntroTestIds.startButton}
      >
        {t('survey:action.start')}
      </Button>
    </div>
  );
};

export default SurveyIntro;
