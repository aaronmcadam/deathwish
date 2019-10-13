import {
  Alert,
  AlertIcon,
  Box,
  BoxProps,
  Heading,
  Stack,
  theme
} from '@chakra-ui/core';
import * as React from 'react';
import ContentLoader from 'react-content-loader';
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
      <Heading
        as="h3"
        size="lg"
        fontWeight="light"
        color="gray.500"
        marginTop={8}
      >
        Here are the deathwishes you've created so far...
      </Heading>
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

const CardPlaceholder: React.FC<BoxProps> = boxProps => {
  if (!theme) {
    return null;
  }

  const { colors } = theme;

  if (!colors) {
    return null;
  }

  // @ts-ignore
  const primaryColor = colors['gray'] ? colors['gray'][100] : 'gray';
  // @ts-ignore
  const secondaryColor = colors['gray'] ? colors['gray'][200] : 'gray';

  return (
    <Box
      backgroundColor="white"
      boxShadow="md"
      width={300}
      height={550}
      marginTop={8}
      {...boxProps}
    >
      <ContentLoader
        height={550}
        width={300}
        speed={2}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      >
        <rect x="0" y="0" width="300" height="300" />
        <rect x="16" y="310" rx="4" ry="4" width="180" height="20" />
        <rect x="16" y="340" rx="4" ry="4" width="215" height="15" />
        <rect x="16" y="365" rx="4" ry="4" width="70" height="15" />
        <rect x="16" y="395" rx="4" ry="4" width="270" height="25" />
        <rect x="16" y="430" rx="4" ry="4" width="270" height="25" />
        <rect x="16" y="465" rx="4" ry="4" width="270" height="25" />
        <rect x="0" y="500" width="300" height="50" />
      </ContentLoader>
    </Box>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <Layout>
      <Stack isInline={true} flexWrap="wrap" spacing={4}>
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
      </Stack>
    </Layout>
  );
};

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
    return <LoadingSkeleton />;
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
      <Stack isInline={true} flexWrap="wrap" spacing={4}>
        {deathwishes.map(deathwish => (
          <DeathwishCard key={deathwish.id} deathwish={deathwish} />
        ))}
      </Stack>
    </Layout>
  );
};
