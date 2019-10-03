import React from 'react';
import { render } from '../testUtils';
import { DeathwishApp } from './DeathwishApp';

it('renders without crashing', () => {
  const { getByTestId } = render(<DeathwishApp />);

  expect(getByTestId('app-pane')).toBeInTheDocument();
});
