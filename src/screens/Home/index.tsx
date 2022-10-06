import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import TodayDate from 'components/TodayDate';

export const homeScreenTestIds = {
  todayDate: 'home__today-date',
  surveyList: 'home__list-survey',
};

const HomeScreen = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <body className="home"></body>
      </Helmet>
      <DefaultLayout>
        <section className="home__today-date">
          <TodayDate data-test-id={homeScreenTestIds.todayDate} />
        </section>
        <section className="home__list-survey">
          <SurveyList data-test-id={homeScreenTestIds.surveyList} />
        </section>
      </DefaultLayout>
    </HelmetProvider>
  );
};

export default HomeScreen;
