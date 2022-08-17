import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import DefaultLayout from '.';

describe('DefaultLayout', () => {
  it('adds the html class', async () => {
    const onHelmetStateChange = jest.fn();

    render(<DefaultLayout onHelmetStateChange={onHelmetStateChange}></DefaultLayout>);

    await waitFor(() => {
      expect(onHelmetStateChange).toHaveBeenCalledTimes(1);
    });

    const helmetState = onHelmetStateChange.mock.calls[0][0];

    expect(helmetState).toEqual(expect.objectContaining({ htmlAttributes: { class: 'layout-default' } }));
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    render(
      <DefaultLayout>
        <p>{childrenContent}</p>
      </DefaultLayout>
    );

    expect(screen.getByText(childrenContent)).toBeVisible();
  });
});