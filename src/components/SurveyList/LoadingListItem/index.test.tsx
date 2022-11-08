import React from 'react';

import { render, screen } from '@testing-library/react';

import LoadingListItem, { loadingListItemTestIds } from '.';

describe('LoadingListItem', () => {
  it('renders the loading list item', () => {
    render(<LoadingListItem />);

    const loadingListItem = screen.getByTestId(loadingListItemTestIds.loadingListItem);

    expect(loadingListItem).toBeVisible();
  });
});
