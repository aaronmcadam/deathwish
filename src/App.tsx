import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { DeathWishApp } from './DeathWishApp';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <DeathWishApp />
    </ThemeProvider>
  );
};
