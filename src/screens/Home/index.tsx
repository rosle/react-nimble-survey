import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import TodayDate from 'components/TodayDate';

const HomeScreen = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <body className="home"></body>
      </Helmet>
      <DefaultLayout>
        <TodayDate />
        <SurveyList className="home__survey-list" />
      </DefaultLayout>
    </HelmetProvider>
  );
};

export default HomeScreen;
