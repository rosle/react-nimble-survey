import React, { useCallback, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import SurveyAdapter from 'adapters/Survey';
import BackgroundImage from 'components/BackgroundImage';
import Button from 'components/Button';
import CaretLeftIcon from 'components/Icon/CaretLeft';
import FullScreenLayout from 'components/Layout/FullScreen';
import SurveyIntro from 'components/SurveyIntro';
import { parseSurveyDetail } from 'helpers/survey';
import { SurveyDetail } from 'types/survey';

export const surveyScreenTestIds = {
  backNavigation: 'survey__back-navigation',
  surveyIntro: 'survey__survey-intro',
};

const SurveyScreen = () => {
  const { id: surveyId } = useParams();
  const [surveyDetail, setSurveyDetail] = useState<Nullable<SurveyDetail>>(null);

  const fetchSurveyDetail = useCallback(async (id: string) => {
    const surveyResponse = await SurveyAdapter.get(id);
    const parsedSurveyDetail = parseSurveyDetail(surveyResponse.data);

    setSurveyDetail(parsedSurveyDetail);
  }, []);

  useEffect(() => {
    fetchSurveyDetail(`${surveyId}`);
  }, [fetchSurveyDetail, surveyId]);

  return (
    <HelmetProvider>
      <Helmet>
        <body className="survey show"></body>
      </Helmet>
      <FullScreenLayout
        topNavigation={
          <Link to="/" data-test-id={surveyScreenTestIds.backNavigation}>
            <Button buttonStyle="link" buttonSize="fit">
              <CaretLeftIcon />
            </Button>
          </Link>
        }
      >
        {surveyDetail && (
          <>
            <BackgroundImage imageUrl={surveyDetail.intro.coverImageUrl} />
            <div className="survey__survey-intro">
              <SurveyIntro surveyDetail={surveyDetail} data-test-id={surveyScreenTestIds.surveyIntro} />
            </div>
          </>
        )}
      </FullScreenLayout>
    </HelmetProvider>
  );
};

export default SurveyScreen;
