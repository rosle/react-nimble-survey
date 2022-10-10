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
      {topNavigation && <header>{topNavigation}</header>}
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default FullScreenLayout;
