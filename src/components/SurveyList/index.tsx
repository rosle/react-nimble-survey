import React from 'react';

import classNames from 'classnames';

import BlankState from 'components/BlankState';
import { useTranslation } from 'react-i18next';

type SurveyListProps = React.HTMLAttributes<HTMLDivElement>;

// TODO: Extract text to the locale file
const SurveyList = ({ className, ...props }: SurveyListProps) => {
  const { t } = useTranslation(['survey'])

  const classes = classNames('survey-list', className);

  return (
    <div className={classes} {...props}>
      <BlankState
        className="survey-list__blank-state"
        emoji="😎"
        description={t('survey:completed')}
      />
    </div>
  );
};

export default SurveyList;
