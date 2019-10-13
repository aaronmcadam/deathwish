import React from 'react';
import { render } from '../../../testUtils';
import { Illustration } from './Illustration';
import { DeathwishType } from '../../../types/graphql';

it('renders an illustration for the deathwish type', () => {
  const { container } = render(<Illustration type={DeathwishType.Holiday} />);

  expect(container).toHaveTextContent('holiday.svg');
});
