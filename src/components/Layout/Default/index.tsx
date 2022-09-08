import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import UserMenu from 'components/UserMenu';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'contexts/UserContext';


export type DefaultLayoutProps = {
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
};

const DefaultLayout = ({ onHelmetStateChange, children }: DefaultLayoutProps) => {
  const { t } = useTranslation(['shared']);
  const { user } = useContext(UserContext);

  return (
    <HelmetProvider>
      <Helmet onChangeClientState={onHelmetStateChange}>
        <html className="layout-default"></html>
      </Helmet>
      <header>
        <Link to="/">
          <span className="visually-hidden">{t('shared:app_name')}</span>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
        {user && <UserMenu user={user}/>}
      </header>
      <main>
        {children}
      </main>
    </HelmetProvider>
  );
};

export default DefaultLayout;
