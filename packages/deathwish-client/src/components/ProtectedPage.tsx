import * as React from 'react';
import { useCurrentUserQuery, useSignInMutation } from '../types/graphql';
import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/core';

const SignInPane: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [signIn] = useSignInMutation({
    variables: {
      input: {
        user: {
          email
        }
      }
    }
  });

  function handleEmailChange(event: any) {
    setEmail(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    signIn();
  }

  // TODO: use same pattern from deathwish creation form
  const formErrors = {
    email: false
  };

  return (
    <Stack align="center" marginTop={20}>
      <Heading as="h1" fontWeight="semibold">
        DeathWish
      </Heading>
      <Heading size="lg">Sign in to your account</Heading>
      <Stack
        data-testid="sign-in-form"
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        width="md"
        px={8}
        py={8}
        marginTop={2}
        backgroundColor="white"
        boxShadow="sm"
      >
        <FormControl isInvalid={!!formErrors.email}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            data-testid="email-input"
            value={email}
            onChange={handleEmailChange}
            type="email"
            autoComplete="email"
            id="email"
            variant="filled"
          />
          <FormErrorMessage>Please enter your email address</FormErrorMessage>
        </FormControl>
        <Button
          // isLoading={isSigningIn}
          loadingText="Signing in..."
          type="submit"
          variantColor="blue"
        >
          Sign in
        </Button>
      </Stack>
    </Stack>
  );
};

export const ProtectedPage: React.FC = ({ children }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data && data.me) {
    return <>{children}</>;
  }

  return <SignInPane />;
};
