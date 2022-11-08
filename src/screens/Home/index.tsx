import React, { useCallback, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SurveyAdapter from 'adapters/Survey';
import DefaultLayout from 'components/Layout/Default';
import SurveyList from 'components/SurveyList';
import TodayDate from 'components/TodayDate';
import { Survey } from 'types/survey';

export const homeScreenTestIds = {
  todayDate: 'home__today-date',
  surveyList: 'home__list-survey',
};

const HomeScreen = () => {
  // TODO: Set Default to false after implement survey list caching on #58.
  // Right now default to true to avoid blank state flashing on page load.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const fetchSurveyList = useCallback(async () => {
    setIsLoading(true);

    const surveysResponse = await SurveyAdapter.list();

    setSurveys(surveysResponse.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSurveyList();
  }, [fetchSurveyList]);

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
          <SurveyList data-test-id={homeScreenTestIds.surveyList} isLoading={isLoading} surveys={surveys} />
        </section>
      </DefaultLayout>
    </HelmetProvider>
  );
};

export default HomeScreen;
