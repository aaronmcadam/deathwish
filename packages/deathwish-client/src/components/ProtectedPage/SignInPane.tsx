import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormHelperText
} from '@chakra-ui/core';
import * as React from 'react';
import { useSignInMutation } from '../../types/graphql';

function validate(fields: {
  email: string;
}): {
  email?: string;
} {
  let errors: {
    email?: string;
  } = {};
  if (!fields.email) {
    errors.email = 'Please enter your email address';
  }

  return errors;
}

export const SignInPane: React.FC = () => {
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{
    email?: string;
  }>({});

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const formErrors = validate({
      email
    });

    if (Object.keys(formErrors).length) {
      setIsSubmitting(false);

      return setFormErrors(formErrors);
    }

    await signIn();

    setIsSubmitting(false);
  }

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
            aria-describedby="email-helper-text"
            variant="filled"
          />
          <FormErrorMessage>Please enter your email address</FormErrorMessage>
          <FormHelperText id="email-helper-text">
            We don't require a password!
          </FormHelperText>
        </FormControl>
        <Button
          isLoading={isSubmitting}
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
