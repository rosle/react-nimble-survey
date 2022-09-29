import React from 'react';

import classNames from 'classnames';

import BlankState from 'components/BlankState';

type SurveyListProps = React.HTMLAttributes<HTMLDivElement>;

// TODO: Extract text to the locale file
// TODO: react/prop-types: 'className' is missing in props validation
const SurveyList = ({ className, ...props }: SurveyListProps) => {
  const classes = classNames('survey-list', className);

  return (
    <div className={classes} {...props}>
      <BlankState
        className="survey-list__blank-state"
        emoji="😎"
        description={`You’ve completed all the surveys.\nTake a moment.`}
      />
    </div>
  );
};

export default SurveyList;
