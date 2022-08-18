import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const LoginScreen = () => {
  const { t } = useTranslation(['auth']);

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form>
        <Input type="email" name="email" label={t('auth:email')} />
        <Input type="password" name="password" label={t('auth:password')} />
        <Button type="submit" label={t('auth:action.sign_in')} fullWidth />
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
