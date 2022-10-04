import React from 'react';
import { BrowserRouter, BrowserRouterProps, MemoryRouter, MemoryRouterProps } from 'react-router-dom';

import { render, RenderResult } from '@testing-library/react';

import { UserContextProvider } from 'contexts/UserContext';

type customRenderWithRouterProps = {
  withContextProvider?: boolean;
};

type renderWithRouterProps = customRenderWithRouterProps & BrowserRouterProps;
type renderWithMemoryRouterProps = customRenderWithRouterProps & MemoryRouterProps;

const renderChildren = (children: React.ReactElement, { withContextProvider = false }) => {
  return withContextProvider ? <UserContextProvider>{children}</UserContextProvider> : children;
};

const renderWithRouter = (
  children: React.ReactElement,
  { withContextProvider, ...routerProps }: renderWithRouterProps = {}
): RenderResult => {
  return render(renderChildren(children, { withContextProvider }), {
    wrapper: (props) => <BrowserRouter {...props} />,
    ...routerProps,
  });
};

const renderWithMemoryRouter = (
  children: React.ReactElement,
  { withContextProvider, ...memoryRouterProps }: renderWithMemoryRouterProps = {}
): RenderResult => {
  return render(renderChildren(children, { withContextProvider }), {
    wrapper: (props) => <MemoryRouter {...memoryRouterProps} {...props} />,
  });
};

export { renderWithRouter, renderWithMemoryRouter };
