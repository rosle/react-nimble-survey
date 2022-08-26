import React from 'react';

import { render, screen } from '@testing-library/react';

import WarningIcon, { warningIconTestId } from 'components/Icon/Warning';

import Alert, { alertTestIds } from './';

describe('Alert', () => {
  it('renders the alert icon', () => {
    render(
      <Alert Icon={WarningIcon} title="Error">
        Something went wrong!
      </Alert>
    );

    const alertIcon = screen.getByTestId(alertTestIds.icon);
    const warningIcon = screen.getByTestId(warningIconTestId);

    expect(alertIcon).toBeVisible();
    expect(warningIcon).toBeVisible();
  });

  it('renders the alert title', () => {
    const title = 'Error';

    render(
      <Alert Icon={WarningIcon} title={title}>
        Something went wrong!
      </Alert>
    );

    const alertTitle = screen.getByTestId(alertTestIds.title);

    expect(alertTitle).toBeVisible();
    expect(alertTitle).toHaveTextContent(title);
  });

  it('renders the alert description', () => {
    const description = 'Something went wrong!';

    render(
      <Alert Icon={WarningIcon} title="Error">
        {description}
      </Alert>
    );

    const alertDescription = screen.getByTestId(alertTestIds.description);

    expect(alertDescription).toBeVisible();
    expect(alertDescription).toHaveTextContent(description);
  });
});
