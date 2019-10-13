import React from 'react';
import { deathwish } from '../../factories';
import { fireEvent, renderWithRouter } from '../../testUtils';
import { EditDeathwishForm } from './EditDeathwishPage';

/**
 * TODO: We need a fake Apollo provider for this test
 * because the page needs to read the deathwish in order to edit it.
 * Alternatively, we could render the form component directly. That would break
 * a little bit of encapsulation, but it would work.
 * I think this sort of trade-off is common with React components. I find that
 * inverting the dependencies can make it easier to get test coverage. Although
 * it may lead to possibly overly-decoupled code, if that's even possible!
 * I have seen some problems occur when components may appear standalone and
 * independent but are actually designed only to be used with higher-level,
 * container-style components.
 */
test('renders the create deathwish form', () => {
  const { getByTestId } = renderWithRouter(
    <EditDeathwishForm currentDeathwish={deathwish()} />
  );
  const form = getByTestId('edit-deathwish-form');
  const titleInput = getByTestId('title-input');
  const submitButton = getByTestId('edit-deathwish-button');

  fireEvent.change(titleInput, { target: { value: 'The best video ever' } });
  expect(submitButton).toHaveTextContent(/update deathwish/i);
  fireEvent.submit(form);
  expect(submitButton).toHaveTextContent(/updating deathwish/i);
});
