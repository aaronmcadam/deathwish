import React from 'react';
import { renderWithRouter } from '../../../testUtils';
import { TemplateList } from './TemplateList';

it('renders the list of templates', () => {
  const { getByTestId } = renderWithRouter(<TemplateList />);

  expect(getByTestId('choose-deathwish-holiday')).toBeInTheDocument();
  expect(getByTestId('choose-deathwish-money')).toBeInTheDocument();
  expect(getByTestId('choose-deathwish-video')).toBeInTheDocument();
});
