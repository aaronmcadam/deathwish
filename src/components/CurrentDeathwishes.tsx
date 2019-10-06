import { Box, Heading, Stack, Text } from '@chakra-ui/core';
import * as React from 'react';
import { useDeathwishesQuery } from '../types/graphql';
import { illustrations } from './DeathwishCard';

export const CurrentDeathwishes: React.FC = () => {
  const { data } = useDeathwishesQuery();

  if (!data) {
    return null;
  }

  if (!data.deathwishes) {
    return null;
  }

  const { deathwishes } = data;

  return (
    <>
      {deathwishes.map(deathwish => (
        <Stack
          key={deathwish.id}
          data-testid="current-deathwish"
          boxShadow="md"
          backgroundColor="white"
          id={deathwish.id}
        >
          <Stack isInline={true} justify="center">
            <Box as={illustrations[deathwish.type]} size={300} padding={4} />
          </Stack>
          <Stack
            spacing={2}
            borderTop="1px"
            borderColor="gray.200"
            px={4}
            py={4}
          >
            <Heading size="md">{deathwish.title}</Heading>
            <Text>{deathwish.description}</Text>
            <Text>£{deathwish.cost}</Text>
            <Text>{deathwish.recipients}</Text>
          </Stack>
        </Stack>
      ))}
    </>
  );
};
