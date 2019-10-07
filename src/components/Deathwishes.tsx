import {
  Box,
  Heading,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Tag,
  TagIcon,
  TagLabel
} from '@chakra-ui/core';
import * as React from 'react';
import { useDeathwishesQuery, Deathwish } from '../types/graphql';
import { illustrations } from './DeathwishCard';
import { Link as ReactRouterLink } from 'react-router-dom';
import * as ReactRouter from 'react-router-dom';
import { StackProps } from '@chakra-ui/core/dist/Stack';

const Layout: React.FC = ({ children }) => {
  return (
    <Box data-testid="deathwishes-pane" py={8}>
      <Stack isInline={true} justify="space-between" align="center">
        <Heading>Your deathwishes</Heading>
        <Button as={ReactRouterLink} to="/" variantColor="pink">
          Create a deathwish
        </Button>
      </Stack>
      {children}
    </Box>
  );
};

const BlankSlate: React.FC = () => {
  return (
    <Alert
      status="info"
      variant="top-accent"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      py={4}
      mx={64}
      marginTop={16}
    >
      <AlertIcon size="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        You have no deathwishes
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Text>You haven't created any deathwishes yet!</Text>
        <Button as={ReactRouterLink} to="/" marginTop={4}>
          Create one now!
        </Button>
      </AlertDescription>
    </Alert>
  );
};

const SuccessMessage: React.FC = () => {
  return (
    <Alert status="success" variant="subtle" marginTop={4}>
      <AlertIcon />
      You successfully created a new deathwish!
    </Alert>
  );
};

const Recipients: React.FC<{ recipients: Deathwish['recipients'] }> = ({
  recipients
}) => {
  const recipientList = recipients.split(',');

  return (
    <Stack>
      {recipientList.map(recipient => (
        <Tag key={recipient}>
          <TagIcon icon="email" size={4} />
          <TagLabel>{recipient}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};

function successStatus(state?: { newDeathwishWasAdded: boolean }) {
  if (!state) {
    return false;
  }

  return state.newDeathwishWasAdded;
}

const DetailedDeathwishCard: React.FC<
  { deathwish: Deathwish } & StackProps
> = ({ deathwish, ...styleProps }) => {
  return (
    <Stack
      key={deathwish.id}
      data-testid="current-deathwish"
      boxShadow="md"
      backgroundColor="white"
      width={300}
      spacing={0}
      marginTop={8}
      {...styleProps}
    >
      <Stack isInline={true} justify="center" align="center" height={300}>
        <Box as={illustrations[deathwish.type]} size={300} padding={4} />
      </Stack>
      <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
        <Heading size="md">{deathwish.title}</Heading>
        <Text color="gray.600">{deathwish.description}</Text>
        <Text fontWeight="bold">£{deathwish.cost}</Text>
        <Recipients recipients={deathwish.recipients} />
      </Stack>
      <Stack
        isInline={true}
        backgroundColor="gray.200"
        justify="flex-end"
        align="center"
        padding={2}
        marginTop="auto"
      >
        <Button variant="link" variantColor="black" size="sm">
          Delete
        </Button>
        <Button variant="outline" variantColor="blue" size="sm">
          Edit
        </Button>
      </Stack>
    </Stack>
  );
};

export const Deathwishes: React.FC = () => {
  const location = ReactRouter.useLocation<{
    newDeathwishWasAdded: boolean;
  }>();
  const newDeathwishWasAdded = successStatus(location.state);
  const { data } = useDeathwishesQuery();

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
      {newDeathwishWasAdded && <SuccessMessage />}
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
          <DetailedDeathwishCard key={deathwish.id} deathwish={deathwish} />
        ))}
      </Stack>
    </Layout>
  );
};
