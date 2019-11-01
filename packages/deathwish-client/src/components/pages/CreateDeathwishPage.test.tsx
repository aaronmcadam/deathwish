import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { fireEvent, renderWithRouter } from '../../testUtils';
import { DeathwishType } from '../../types/graphql';
import { CreateDeathwishPage } from './CreateDeathwishPage';

function historyForCreate(): MemoryHistory<{
  type: DeathwishType;
}> {
  const route = '/create';
  const history = createMemoryHistory<{
    type: DeathwishType;
  }>({ initialEntries: [route] });

  history.push({
    pathname: route,
    state: {
      type: DeathwishType.Video
    }
  });

  return history;
}

test('renders the create deathwish form', () => {
  const { getByTestId } = renderWithRouter(<CreateDeathwishPage />, {
    history: historyForCreate()
  });
  const form = getByTestId('create-deathwish-form');
  const titleInput = getByTestId('title-input');
  const descriptionInput = getByTestId('description-input');
  const costInput = getByTestId('cost-input');
  const recipientsInput = getByTestId('recipients-input');
  const submitButton = getByTestId('create-deathwish-button');

  fireEvent.change(titleInput, { target: { value: 'A video montage' } });
  fireEvent.change(descriptionInput, {
    target: { value: 'A documentary of my life' }
  });
  fireEvent.change(costInput, '10000');
  fireEvent.change(recipientsInput, {
    target: { value: 'lucky@example.com,another@example.com' }
  });
  expect(submitButton).toHaveTextContent(/create deathwish/i);
  fireEvent.submit(form);
  expect(submitButton).toHaveTextContent(/creating deathwish/i);
});
