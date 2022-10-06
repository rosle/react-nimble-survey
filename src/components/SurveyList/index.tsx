import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import BlankState from 'components/BlankState';

export const surveyListTestIds = {
  blankState: 'list-survey__blank-state',
};

export type SurveyListProps = React.HTMLAttributes<HTMLDivElement>;

const SurveyList = ({ className, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey']);

  return (
    <div className={classNames('list-survey', className)} {...props}>
      <BlankState
        className="list-survey__blank-state"
        emoji="😎"
        description={t('survey:completed')}
        data-test-id={surveyListTestIds.blankState}
      />
    </div>
  );
};

export default SurveyList;
