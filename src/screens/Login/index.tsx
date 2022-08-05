import React from 'react';
import { useTranslation } from 'react-i18next';

import AuthLayout from 'components/Layout/Auth';

const LoginScreen = () => {
  const { t } = useTranslation('auth');

  return <AuthLayout headerTitle={t('sign_in')}></AuthLayout>;
};

export default LoginScreen;
