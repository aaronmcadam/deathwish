import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { client } from './graphql/client';
import { Router, RouterProps } from 'react-router';
import { createMemoryHistory } from 'history';

const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

// Taken from https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples
export function renderWithRouter(
  ui: React.ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  }: {
    route?: string;
    history?: RouterProps['history'];
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>, { wrapper: Providers }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return render(ui, { wrapper: Providers, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
