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
        <section className="home__today-date">
          <TodayDate />
        </section>
        <section className="home__survey-list">
          <SurveyList />
        </section>
      </DefaultLayout>
    </HelmetProvider>
  );
};

export default HomeScreen;
