import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from 'assets/images/logo.svg';

export const AuthLayoutTestIds = {
  headerLogo: 'app-header__logo',
  headerTitle: 'app-header__title',
};

type AuthLayoutProps = {
  headerTitle: string;
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
};

const AuthLayout = ({ headerTitle, onHelmetStateChange, children }: AuthLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet onChangeClientState={onHelmetStateChange}>
        <html className="layout-auth"></html>
      </Helmet>
      <main>
        <header className="app-header">
          <img src={logo} className="app-header__logo" alt="logo" data-test-id={AuthLayoutTestIds.headerLogo} />
          <p className="app-header__title" data-test-id={AuthLayoutTestIds.headerTitle}>
            {headerTitle}
          </p>
        </header>
        <div className="app-content">{children}</div>
      </main>
    </HelmetProvider>
  );
};

export default AuthLayout;
