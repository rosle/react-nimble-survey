import React from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import BlankState from 'components/BlankState';

type SurveyListProps = React.HTMLAttributes<HTMLDivElement>;

const SurveyList = ({ className, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey']);

  return (
    <div className={classNames('survey-list', className)} {...props}>
      <BlankState className="survey-list__blank-state" emoji="😎" description={t('survey:completed')} />
    </div>
  );
};

export default SurveyList;
