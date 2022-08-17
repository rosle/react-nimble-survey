import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import AuthLayout, { authLayoutTestIds } from '.';

describe('AuthLayout', () => {
  it('adds the html class', async () => {
    const onHelmetStateChange = jest.fn();

    render(<AuthLayout headerTitle="Sign in" onHelmetStateChange={onHelmetStateChange}></AuthLayout>);

    await waitFor(() => {
      expect(onHelmetStateChange).toHaveBeenCalledTimes(1);
    });

    const helmetState = onHelmetStateChange.mock.calls[0][0];

    expect(helmetState).toEqual(expect.objectContaining({ htmlAttributes: { class: 'layout-auth' } }));
  });

  it('renders the app logo', () => {
    render(<AuthLayout headerTitle="Sign in"></AuthLayout>);

    const headerLogo = screen.getByTestId(authLayoutTestIds.headerLogo);

    expect(headerLogo).toBeVisible();
  });

  it('renders the header title', () => {
    const headerTitleText = 'Sign in to Nimble';

    render(<AuthLayout headerTitle={headerTitleText}></AuthLayout>);

    const headerTitle = screen.getByTestId(authLayoutTestIds.headerTitle);

    expect(headerTitle).toBeVisible();
    expect(headerTitle).toHaveTextContent(headerTitleText);
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    render(
      <AuthLayout headerTitle="Sign in">
        <p>{childrenContent}</p>
      </AuthLayout>
    );

    expect(screen.getByText(childrenContent)).toBeVisible();
  });
});
