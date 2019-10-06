import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@chakra-ui/core';
import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { client } from './graphql/client';

const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

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
