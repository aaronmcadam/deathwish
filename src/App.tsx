import { ApolloProvider } from '@apollo/react-hooks';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import { client } from './client';
import { DeathwishApp } from './components/DeathwishApp';

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <DeathwishApp />
      </ThemeProvider>
    </ApolloProvider>
  );
};
