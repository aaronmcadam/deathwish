import React from 'react';
import { render } from './testUtils';
import { DeathWishApp } from './DeathWishApp';

it('renders without crashing', () => {
  const { getByTestId } = render(<DeathWishApp />);

  expect(getByTestId('app-pane')).toBeInTheDocument();
});
