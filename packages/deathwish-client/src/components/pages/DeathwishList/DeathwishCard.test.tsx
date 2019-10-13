import React from 'react';
import { deathwish } from '../../../factories';
import {
  fireEvent,
  renderWithRouter,
  waitForElement
} from '../../../testUtils';
import { DeathwishType } from '../../../types/graphql';
import { DeathwishCard } from './DeathwishCard';

test('renders a card for the deathwish', () => {
  const { container } = renderWithRouter(
    <DeathwishCard
      deathwish={deathwish({
        title: 'An amazing video',
        type: DeathwishType.Video
      })}
    />
  );

  expect(container).toHaveTextContent('video.svg');
  expect(container).toHaveTextContent('An amazing video');
});

test('allows the deathwish to be edited', async () => {
  const { getByTestId } = renderWithRouter(
    <DeathwishCard
      deathwish={deathwish({
        type: DeathwishType.Video
      })}
    />
  );

  expect(getByTestId('edit-deathwish-button')).toBeInTheDocument();
});

test('allows the deathwish to be deleted', async () => {
  const { getByTestId, container } = renderWithRouter(
    <DeathwishCard
      deathwish={deathwish({
        type: DeathwishType.Video
      })}
    />
  );

  const deleteButton = getByTestId('delete-deathwish-button');
  fireEvent.click(deleteButton);
  const confirmButton = await waitForElement(
    () => getByTestId('confirm-delete-button'),
    { container }
  );
  expect(confirmButton).toHaveTextContent(/delete deathwish/i);
  fireEvent.click(confirmButton);
  expect(confirmButton).toHaveTextContent(/deleting deathwish/i);
});
