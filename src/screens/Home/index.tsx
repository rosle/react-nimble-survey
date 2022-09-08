import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import DefaultLayout from 'components/Layout/Default';
import { UserContext } from 'contexts/UserContext';
import { User } from 'types/user';

const HomeScreen = () => {
  const { t } = useTranslation(['shared']);
  const { user } = useContext(UserContext) as { user: User} ;

  return (
    <DefaultLayout>
      This is page content
    </DefaultLayout>
  );
};

export default HomeScreen;
