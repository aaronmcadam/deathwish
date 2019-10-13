import React from 'react';
import { renderWithRouter } from '../../../testUtils';
import { DeathwishType } from '../../../types/graphql';
import { TemplateCard } from './TemplateCard';

it('renders the template for the deathwish type', () => {
  const { container, getByTestId } = renderWithRouter(
    <TemplateCard type={DeathwishType.Money} />
  );

  expect(container).toHaveTextContent('money.svg');
  expect(getByTestId('choose-deathwish-money')).toHaveTextContent(
    'Choose this deathwish'
  );
});
