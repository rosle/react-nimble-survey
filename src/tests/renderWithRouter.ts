import { BrowserRouter } from 'react-router-dom';

import { render, RenderResult } from '@testing-library/react';

const renderWithRouter = (ui: React.ReactElement): RenderResult => {
  return render(ui, { wrapper: BrowserRouter });
};

export { renderWithRouter };
