import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo.svg';
import DefaultLayout from 'components/Layout/Default';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <img src={logo} className="app-logo" alt="logo" />
      <p>{t('sample_page.message', { codeSample: '<code>src/App.tsx</code>' })}</p>
      <a className="app-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" data-test-id="app-link">
        {t('sample_page.learn_react')}
      </a>
    </DefaultLayout>
  );
};

export default HomeScreen;