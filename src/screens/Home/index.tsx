import React from 'react';

import DefaultLayout from 'components/Layout/Default';
import TodayDate from 'components/TodayDate';

// TODO: Update the home page later on #17
const HomeScreen = () => {
  return <DefaultLayout>
    <TodayDate />
  </DefaultLayout>;
};

export default HomeScreen;
