import * as React from 'react';
import { useCurrentUserQuery } from '../../../types/graphql';
import { SignInPage } from './SignInPage';

export const ProtectedPage: React.FC = ({ children }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data && data.me) {
    return <>{children}</>;
  }

  return <SignInPage />;
};
