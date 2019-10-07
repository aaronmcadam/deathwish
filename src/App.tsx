import { ApolloProvider } from '@apollo/react-hooks';
import { CSSReset, theme, ThemeProvider } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import React from 'react';
import { DeathwishApp } from './components/DeathwishApp';
import { client } from './graphql/client';

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <Global
          styles={{
            body: {
              // @ts-ignore
              backgroundColor: theme.colors.blue[50]
            }
          }}
        />
        <DeathwishApp />
      </ThemeProvider>
    </ApolloProvider>
  );
};
