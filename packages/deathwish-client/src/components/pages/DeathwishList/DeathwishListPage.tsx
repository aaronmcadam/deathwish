import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Spinner,
  Stack
} from '@chakra-ui/core';
import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import {
  useCurrentUserQuery,
  useDeathwishesQuery
} from '../../../types/graphql';
import { ButtonLink } from '../../common/ButtonLink';
import { BlankSlate } from './BlankSlate';
import { DeathwishCard } from './DeathwishCard';

const Layout: React.FC = ({ children }) => {
  return (
    <Box data-testid="deathwish-list-page" py={8}>
      <Stack isInline={true} justify="space-between" align="center">
        <Heading>Your deathwishes</Heading>
        <ButtonLink to="/" variantColor="pink">
          Create a deathwish
        </ButtonLink>
      </Stack>
      {children}
    </Box>
  );
};

const CreateSuccessMessage: React.FC = () => {
  return (
    <Alert status="success" variant="subtle" marginTop={4}>
      <AlertIcon />
      You successfully created a new deathwish!
    </Alert>
  );
};

const UpdateSuccessMessage: React.FC = () => {
  return (
    <Alert status="success" variant="subtle" marginTop={4}>
      <AlertIcon />
      You successfully updated your deathwish!
    </Alert>
  );
};

function createStatus(state?: { newDeathwishWasAdded?: boolean }) {
  if (!state) {
    return false;
  }

  return state.newDeathwishWasAdded;
}

function editStatus(state?: { deathwishWasUpdated?: boolean }) {
  if (!state) {
    return false;
  }

  return state.deathwishWasUpdated;
}

export const DeathwishListPage: React.FC = () => {
  const location = ReactRouter.useLocation<{
    newDeathwishWasAdded?: boolean;
    deathwishWasUpdated?: boolean;
  }>();
  const newDeathwishWasAdded = createStatus(location.state);
  const deathwishWasUpdated = editStatus(location.state);
  const { data: currentUserPayload } = useCurrentUserQuery();
  const ownerEmail =
    currentUserPayload && currentUserPayload.me
      ? currentUserPayload.me.email
      : 'guest@example.com';
  const { data, loading } = useDeathwishesQuery({
    variables: {
      ownerEmail: ownerEmail
    }
  });

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (!data) {
    return null;
  }

  if (!data.deathwishes) {
    return null;
  }

  const { deathwishes } = data;

  if (deathwishes.length === 0) {
    return (
      <Layout>
        <BlankSlate />
      </Layout>
    );
  }

  return (
    <Layout>
      {newDeathwishWasAdded && <CreateSuccessMessage />}
      {deathwishWasUpdated && <UpdateSuccessMessage />}
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Here are the deathwishes you've created so far...
      </Heading>
      <Stack isInline={true} flexWrap="wrap" spacing={4}>
        {deathwishes.map(deathwish => (
          <DeathwishCard key={deathwish.id} deathwish={deathwish} />
        ))}
      </Stack>
    </Layout>
  );
};
