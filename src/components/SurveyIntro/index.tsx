import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import Button from 'components/Button';
import { Survey, SurveyQuestion } from 'types/survey';

export const surveyIntroTestIds = {
  cover: 'survey-intro__cover',
  title: 'survey-intro__title',
  description: 'survey-intro__description',
  startButton: 'survey-intro__action--start',
};

export interface SurveyIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  survey: Survey;
  surveyIntro: SurveyQuestion;
}

const SurveyIntro = ({ survey, surveyIntro, className, ...props }: SurveyIntroProps) => {
  const { t } = useTranslation(['survey']);

  return (
    <div className={classNames('survey-intro', className)} {...props}>
      <img
        className="survey-intro__cover"
        src={surveyIntro.coverImageUrl}
        alt="survey cover"
        data-test-id={surveyIntroTestIds.cover}
      />
      <h1 className="survey-intro__title" data-test-id={surveyIntroTestIds.title}>
        {survey.title}
      </h1>
      <div className="survey-intro__description" data-test-id={surveyIntroTestIds.description}>
        {surveyIntro.text}
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
