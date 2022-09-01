import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isEmpty } from 'lodash';

import logo from 'assets/images/logo.svg';
import DefaultLayout from 'components/Layout/Default';
import useLocalStorage, { STORAGE_KEYS } from 'hooks/useLocalStorage';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tokens] = useLocalStorage(STORAGE_KEYS.tokens);

  useEffect(() => {
    if (isEmpty(tokens)) {
      navigate('/sign_in');
    }
  }, [navigate, tokens]);

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
