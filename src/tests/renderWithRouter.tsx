import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, RenderResult } from '@testing-library/react';

import { UserContextProvider } from 'contexts/UserContext';

type renderWithRouterProps = {
  withContextProvider?: boolean;
};

const renderWithContextProvider = (ui: React.ReactElement) => {
  return <UserContextProvider>{ui}</UserContextProvider>;
};

const renderWithRouter = (ui: React.ReactElement, { withContextProvider = false }: renderWithRouterProps = {}): RenderResult => {
  const renderedUi = withContextProvider ? renderWithContextProvider(ui) : ui;

  return render(renderedUi, { wrapper: BrowserRouter });
};

export { renderWithRouter };
