import React from 'react';

import BlankState from 'components/BlankState';

// TODO: Extract text to the locale file
const SurveyList = () => {
  return (
    <>
      <BlankState
        className="survey-list__blank-state"
        emoji="😎"
        description={`You’ve completed all the surveys.\nTake a moment.`}
      />
    </>
  );
};

export default SurveyList;
