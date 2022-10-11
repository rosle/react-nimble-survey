import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BackgroundImage from 'components/BackgroundImage';
import Button from 'components/Button';
import CaretLeftIcon from 'components/Icon/CaretLeft';
import FullScreenLayout from 'components/Layout/FullScreenTest';
import SurveyIntro from 'components/SurveyIntro';
import { Survey, SurveyQuestion } from 'types/survey';

// TODO: Remove mock once integrated to the backend on #22
const mockSurvey: Survey = {
  id: 'a83d91f5518e5c14a8bf',
  title: "Let's Chick",
  description: "We'd love to hear from you!",
  coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/6ea42840403875928db3_',
  createdAt: '2017-01-19T06:03:42.220Z',
};

const mockSurveyIntro: SurveyQuestion = {
  id: '1d5add1b3a3efd3c7bfe',
  text: 'Thank you for visiting us!\nYou could assist us greatly by taking a brief moment to complete this questionnaire. Your valued answers will not only help us measure up to your expectations, but also assist us to maintain and improve our service.  Your kind co-operation is greatly appreciated.',
  displayOrder: 0,
  shortText: 'introduction',
  pick: 'none',
  displayType: 'intro',
  isMandatory: false,
  imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/2306dda4221c0d23c716_',
  coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/6ea42840403875928db3_',
  coverImageOpacity: 0.26,
};

const SurveyScreen = () => {
  /* istanbul ignore next: Will be handled after implement survey questions on #44 */
  const handleSurveyStart = () => {
    console.info(`Start the survey`);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <body className="survey show"></body>
      </Helmet>
      <FullScreenLayout
        topNavigation={
          <Link to="/">
            <Button buttonStyle="link" buttonSize="fit">
              <CaretLeftIcon />
            </Button>
          </Link>
        }
      >
        <BackgroundImage imageUrl={mockSurveyIntro.coverImageUrl} />
        <div className="survey__survey-intro">
          <SurveyIntro survey={mockSurvey} surveyIntro={mockSurveyIntro} onStart={handleSurveyStart} />
        </div>
      </FullScreenLayout>
    </HelmetProvider>
  );
};

export default SurveyScreen;
