import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AuthAdapter from 'adapters/Auth';
import logo from 'assets/images/logo.svg';
import UserMenu from 'components/UserMenu';
import { UserContext } from 'contexts/UserContext';

export const defaultLayoutTestIds = {
  logoLink: 'app-logo-link',
  userMenu: 'user-menu',
};

export type DefaultLayoutProps = {
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
};

const DefaultLayout = ({ onHelmetStateChange, children }: DefaultLayoutProps) => {
  const { t } = useTranslation(['shared']);
  const { setTokens, setUser, tokens, user } = useContext(UserContext);

  const logout = async () => {
    if (tokens === null) return;

    try {
      await AuthAdapter.logout(tokens);

      setTokens(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HelmetProvider>
      <Helmet onChangeClientState={onHelmetStateChange}>
        <html className="layout-default"></html>
      </Helmet>
      <header>
        <Link to="/" data-test-id={defaultLayoutTestIds.logoLink}>
          <span className="visually-hidden">{t('shared:app_name')}</span>
          <img src={logo} className="app-logo" alt="logo" />
        </Link>
        {user && <UserMenu user={user} data-test-id={defaultLayoutTestIds.userMenu} onLogout={logout} />}
      </header>
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default DefaultLayout;
