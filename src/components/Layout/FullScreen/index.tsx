import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export type FullScreenLayoutProps = {
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
  topNavigation?: React.ReactNode;
};

const FullScreenLayout = ({ onHelmetStateChange, children, topNavigation }: FullScreenLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet onChangeClientState={onHelmetStateChange}>
        <html className="layout-fullscreen"></html>
      </Helmet>
      <main>
        {topNavigation && <header className="app-header">{topNavigation}</header>}
        <div className="app-content">{children}</div>
      </main>
    </HelmetProvider>
  );
};

export default FullScreenLayout;
