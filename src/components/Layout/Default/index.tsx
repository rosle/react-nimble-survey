import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export type DefaultLayoutProps = {
  onHelmetStateChange?: () => void;
  children?: React.ReactNode;
};

const DefaultLayout = ({ onHelmetStateChange, children }: DefaultLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet onChangeClientState={onHelmetStateChange}>
        <html className="layout-default"></html>
      </Helmet>
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default DefaultLayout;
