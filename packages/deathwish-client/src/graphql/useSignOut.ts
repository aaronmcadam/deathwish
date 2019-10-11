import * as React from 'react';
import * as ReactApolloHooks from '@apollo/react-hooks';
import { deleteUser } from './client';

export const useSignOut = () => {
  const client = ReactApolloHooks.useApolloClient();

  return React.useCallback(() => {
    deleteUser();
    client.writeData({
      data: {
        me: null
      }
    });
  }, [client]);
};
