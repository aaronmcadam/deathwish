import * as ApolloReactHooks from '@apollo/react-hooks';
import { Box, Heading, Stack, Text } from '@chakra-ui/core';
import gql from 'graphql-tag';
import * as React from 'react';
import { DeathwishQuery } from '../types';
import { illustrations } from './DeathwishCard';

const DEATHWISH = gql`
  query Deathwish {
    deathwish @client {
      type
      name
      description
      cost
      recipients
    }
  }
`;

export const CurrentWish: React.FC = () => {
  const { data } = ApolloReactHooks.useQuery<DeathwishQuery>(DEATHWISH);

  if (!data) {
    return null;
  }

  const { deathwish } = data;

  return (
    <Stack boxShadow="md" backgroundColor="white">
      <Stack isInline={true} justify="center">
        <Box as={illustrations[deathwish.type]} size={300} padding={4} />
      </Stack>
      <Stack spacing={2} borderTop="1px" borderColor="gray.200" px={4} py={4}>
        <Heading size="md">{deathwish.name}</Heading>
        <Text>{deathwish.description}</Text>
        <Text>£{deathwish.cost}</Text>
        <Text>{deathwish.recipients}</Text>
      </Stack>
    </Stack>
  );
};
