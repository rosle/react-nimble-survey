import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo.svg';
import DefaultLayout from 'components/Layout/Default';
import { UserContext } from 'contexts/UserContext';
import { User } from 'types/user';

import UserMenu from 'components/UserMenu';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const { t } = useTranslation(['shared']);
  const { user } = useContext(UserContext) as { user: User} ;

  return (
    <DefaultLayout>
      <nav>
        <Link to="/">
          <span className="visually-hidden">{t('shared:app_name')}</span>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
        <UserMenu user={user}/>
      </nav>
    </DefaultLayout>
  );
};

export default HomeScreen;
