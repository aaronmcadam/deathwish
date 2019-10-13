import React from 'react';
import { render, fireEvent } from '../../../testUtils';
import { SignInPage } from './SignInPage';

test('renders the sign in form', () => {
  const { getByTestId } = render(<SignInPage />);
  const form = getByTestId('sign-in-form');
  const emailInput = getByTestId('email-input');
  const submitButton = getByTestId('sign-in-button');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(submitButton).toHaveTextContent(/sign in/i);
  fireEvent.submit(form);
  expect(submitButton).toHaveTextContent(/signing in/i);
});
