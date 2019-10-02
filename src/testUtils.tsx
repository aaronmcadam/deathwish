import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
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
