import React from 'react';

import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import TodayDate from 'components/TodayDate';

const HomeScreen = () => {
  return (
    <DefaultLayout>
      <TodayDate />
      <SurveyList />
    </DefaultLayout>
  );
};

export default HomeScreen;
