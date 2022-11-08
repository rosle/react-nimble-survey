import React, { useCallback, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import SurveyAdapter from 'adapters/Survey';
import BackgroundImage from 'components/BackgroundImage';
import Button from 'components/Button';
import CaretLeftIcon from 'components/Icon/CaretLeft';
import FullScreenLayout from 'components/Layout/FullScreen';
import SurveyIntro from 'components/SurveyIntro';
import { parseSurveyStep } from 'helpers/survey';
import { Survey, SurveyStep } from 'types/survey';

export const surveyScreenTestIds = {
  backNavigation: 'survey__back-navigation',
  surveyIntro: 'survey__survey-intro',
};

const SurveyScreen = () => {
  const { id: surveyId } = useParams();
  const [survey, setSurvey] = useState<Nullable<Survey>>(null);
  const [surveyStep, setSurveyStep] = useState<Nullable<SurveyStep>>(null);

  const fetchSurveyDetail = useCallback(async (id: string) => {
    const surveyResponse = await SurveyAdapter.get(id);
    const parsedSurveyStep = parseSurveyStep(surveyResponse.data);

    setSurvey(surveyResponse.data);
    setSurveyStep(parsedSurveyStep);
  }, []);

  useEffect(() => {
    fetchSurveyDetail(`${surveyId}`);
  }, [fetchSurveyDetail, surveyId]);

  const surveyIntro = surveyStep && surveyStep.intro;

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
        {survey && surveyIntro && (
          <>
            <BackgroundImage imageUrl={surveyIntro.coverImageUrl} />
            <div className="survey__survey-intro">
              <SurveyIntro survey={survey} surveyIntro={surveyIntro} data-test-id={surveyScreenTestIds.surveyIntro} />
            </div>
          </>
        )}
      </FullScreenLayout>
    </HelmetProvider>
  );
};

export default SurveyScreen;
